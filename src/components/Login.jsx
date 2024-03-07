import { useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: null,
    email: null,
    password: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //on clicking submit button vaidation and authentication must be done and respective
  // thing or error should be shown
  const handleButtonClick = () => {
    const message = checkValidData(userDetails.email, userDetails.password);
    setErrorMessage(message);
    if (message) return; //if msg is null means go forward and authenticate
    //                      otherwise the email and/or password was not valid

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userDetails.name,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          // const errorCode = error.code;  //used it earlier but not needed both are same
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          //const errorCode = error.code;  //used it earlier but not needed both are same
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setErrorMessage(null);
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen md:h-full object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-4 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl py-3">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {isSignInForm && (
            <span
              className="py-5 hover:text-yellow-100 cursor-pointer"
              onClick={() => {
                setErrorMessage(null);
                setUserDetails({
                  name: "Ananay Mahajan",
                  email: "ananay10@gmail.com",
                  password: "An@12345",
                });
              }}
            >
              🗝️Demo Credentials
            </span>
          )}
        </div>
        {/* if it is a signup form then only show name input box otherwise don't */}
        {!isSignInForm && (
          <input
            onChange={(e) => {
              setErrorMessage(null);
              setUserDetails({
                ...userDetails,
                name: e.target.value,
              });
            }}
            value={userDetails.name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 bg-opacity-80"
          />
        )}
        <input
          onChange={(e) => {
            setErrorMessage(null);
            setUserDetails({
              ...userDetails,
              email: e.target.value,
            });
          }}
          value={userDetails.email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-80"
        />
        <input
          onChange={(e) => {
            setErrorMessage(null);
            setUserDetails({
              ...userDetails,
              password: e.target.value,
            });
          }}
          value={userDetails.password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-80"
        />
        {/* to show the error msg if valid data is not inputted or is not an authorized user */}
        <p className="text-red-500 font-bold pt-2">{errorMessage}</p>
        <button
          className="p-4 my-5 bg-red-700 w-full rounded-lg hover:bg-red-600"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer hover:text-slate-400"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;
