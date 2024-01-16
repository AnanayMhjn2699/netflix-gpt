import { useDispatch, useSelector } from "react-redux";
import { LOGO } from "../utils/constants";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user); //to use user from the store

  //to use onAuthStateChanged event listener to do something after authorization and
  // putting it in useEffect so that it happens only when header re-renders and putting
  //this useEffect in header component because the header will always be there on every page and
  //also can't put it in body component because navigate can only be used inside Router and we are
  //definig routes in body only that's why
  useEffect(() => {
    //the onAuthStateChanged returns a function that can be called to unmount it from memory
    //we are navigating inside here bcoz we dont want user to go here and there without being authorized means
    //if user is authenticated then only browse page should open and even if we type"/" in link it doesnot
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

  return (
    <div className="flex justify-between w-full absolute px-3 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-40" src={LOGO} alt="Netflix's logo" />
      {user && (
        <div className="flex">
          <img className="w-10 h-10 mt-4" alt="usericon" src={user?.photoURL} />
          <button
            className="font-bold text-white ml-[3px]"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
