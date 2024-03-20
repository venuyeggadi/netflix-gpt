import React from "react";
import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="banner"
        />
      </div>
      <form className="w-3/12 bg-black bg-opacity-80 bg-bla p-12 absolute my-36 mx-auto left-0 right-0 text-white rounded-md">
        <h1 className="font-bold text-3xl py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email"
          className="p-4 my-2 w-full rounded-md bg-black bg-opacity-50 border-gray-50 border"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full rounded-md  bg-black bg-opacity-50 border-gray-50 border"
        />
        <button type="submit" className="bg-red-600 p-2 my-2 w-full rounded-sm">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
