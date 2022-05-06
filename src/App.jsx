import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SearchAlbums from "./pages/SearchAlbums";

import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./store/user";
import { getTheme } from "./store/theme";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Trae token y theme alojados en redux store
  const userToken = useSelector((state) => state.user.token);
  const userTheme = useSelector((state) => state.theme.darktheme);
  //Trae token y theme alojados en localStorage
  const tokenAtStorage = localStorage.getItem("token");
  const themeAtStorage = localStorage.getItem("theme");

  useEffect(() => {
    if (!userToken && !tokenAtStorage) {
      navigate("/");
    }
    if (tokenAtStorage) {
      dispatch(userLogin(tokenAtStorage));
    }
    if (themeAtStorage === null) {
      localStorage.setItem("theme", userTheme);
    }
    if (userTheme !== themeAtStorage) {
      getTheme();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={!userToken ? <Login /> : <SearchAlbums />} />
        <Route path="/me" element={userToken ? <Profile /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
