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
import { toggleShowGptSearch } from "../store/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { setLanguage } from "../store/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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

  const handleGptButtonClick = () => {
    console.log("GPT Button Clicked");
    dispatch(toggleShowGptSearch());
  };

  const handleLanguageSelect = (e) => { 
    dispatch(setLanguage(e.target.value));
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-48" src={NETFLIX_LOGO_URL} alt="logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="h-[50px] px-4 mx-2 rounded-md"
              onChange={handleLanguageSelect}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptButtonClick}
            className="text-white h-[50px] bg-purple-800 px-4 mx-2 rounded-md"
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
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
          <button
            onClick={handleLogout}
            className="text-white h-[50px] bg-red-800 px-4 mx-2 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
