import React, { useRef, useState } from "react";
import Header from "./Header";
import validateEmailPassword from "../utils/validateEmailPassword";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const email = useRef();
  const password = useRef();

  const handleSubmit = () => {
    const validation = validateEmailPassword(email.current.value, password.current.value);
    setErrorMessage(validation);
  }

  return (
    <div>
      <Header />
      <div className="">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="banner"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 bg-black bg-opacity-80 bg-bla p-12 absolute my-36 mx-auto top-0 left-0 right-0 text-white rounded-md">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input
          type="text"
          placeholder="Full name"
          className="p-4 my-2 w-full rounded-md bg-black bg-opacity-50 border-gray-50 border"
        />}
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
        <button type="submit" onClick={handleSubmit} className="bg-red-600 p-2 my-2 w-full rounded-sm">
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
