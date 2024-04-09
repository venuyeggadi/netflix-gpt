import React, { useRef, useState } from "react";
import Header from "./Header";
import validateEmailPassword from "../utils/validateEmailPassword";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { NETFLIX_BANNER_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async () => {
    const validationError = validateEmailPassword(
      email.current.value,
      password.current.value
    );
    setErrorMessage(validationError);

    if (validationError) return;

    if (!isSignInForm) {
      // Sign up
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;
        console.log(user);
        try {
          await updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/83580261?v=4",
          });
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(setUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        } catch (error) {
          setErrorMessage(error.message);
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "---" + errorMessage);
      }
    } else {
      // Sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " --- " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="">
        <img
          src={NETFLIX_BANNER_URL}
          alt="banner"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 bg-black bg-opacity-80 bg-bla p-12 absolute my-36 mx-auto top-0 left-0 right-0 text-white rounded-md"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full name"
            className="p-4 my-2 w-full rounded-md bg-black bg-opacity-50 border-gray-50 border"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="p-4 my-2 w-full rounded-md bg-black bg-opacity-50 border-gray-50 border"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full rounded-md  bg-black bg-opacity-50 border-gray-50 border"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button
          type="submit"
          onClick={async () => await handleSubmit()}
          className="bg-red-600 p-2 my-2 w-full rounded-sm"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p>
          {isSignInForm ? "New to Netflix?" : "Already have an account?"}{" "}
          <span
            className="hover:underline cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign up" : "Sign in"} now
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
