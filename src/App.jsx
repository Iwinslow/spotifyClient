import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SearchAlbums from "./pages/SearchAlbums";

import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./store/user";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const tokenAtStorage = localStorage.token;

  useEffect(() => {
    if (!userToken && !tokenAtStorage) {
      navigate("/");
    }
    if (tokenAtStorage) {
      dispatch(userLogin(tokenAtStorage));
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
