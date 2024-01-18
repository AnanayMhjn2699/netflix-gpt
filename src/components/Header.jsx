import { useDispatch, useSelector } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { clearGptMovieResult, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user); //to use user from the store
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch); //whether to show gptSearch option or not

  //to use onAuthStateChanged event listener to do something after authorization and
  // putting it in useEffect so that it happens only when header re-renders and putting
  //this useEffect in header component because the header will always be there on every page and
  //also can't put it in body component because navigate can only be used inside Router and we are
  //definig routes in body only that's why
  useEffect(() => {
    //the onAuthStateChanged returns a function that can be called to unmount it from memory
    //we are navigating inside here bcoz we dont want user to go here and there without being authorized
    //means if user is authenticated then only browse page should open and even if we type"/" in link it doesnot
    //take us to loginpage and also same for browse page i.e if user is not signed in browse should not work.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts because this onAuthStateChanged is kind of event Listener and
    //we want to clear this event from memory
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    //signOut is function from firebase similar to signin signup
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
    dispatch(clearGptMovieResult());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="flex justify-between w-full absolute px-3 py-2 bg-gradient-to-b from-black z-10 flex-col md:flex-row">
      <img className="w-40 mx-auto md:mx-0" src={LOGO} alt="Netflix's logo" />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="font-bold ml-1 text-white "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
