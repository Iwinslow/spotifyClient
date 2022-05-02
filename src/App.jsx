import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SearchAlbums from "./pages/SearchAlbums";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search/" element={<SearchAlbums />} />
        <Route path="/me" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
