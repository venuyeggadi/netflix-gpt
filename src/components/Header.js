import { AccountCircle } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../store/userSlice";
import { NETFLIX_LOGO_URL } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          setUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(clearUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-48"
        src={NETFLIX_LOGO_URL}
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
