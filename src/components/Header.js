import { AccountCircle } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-48"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div className="flex p-2">
          {/* <AccountCircle
            className="text-5xl"
            sx={{
              color: "red",
              fontSize: "50px",
            }}
          /> */}
          <img
            className="h-[50px] rounded-full"
            src={user.photoURL}
            alt="profile"
          />
          <button onClick={handleLogout} className="text-white h-[50px]">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
