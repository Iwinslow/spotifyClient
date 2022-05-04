import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { searchByArtist } from "../services/searchServices";
import { userLogout } from "../store/user";

import style from "../styles/SearchBar.module.css";

function SearchBar({ setSearchResult }) {
  const [searchKey, setSearchKey] = useState("");
  const userToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await searchByArtist(searchKey, userToken);
    if (result === "The access token expired") {
      dispatch(userLogout());
    } else {
      setSearchResult({
        key: searchKey,
        result,
      });
    }
  };

  return (
    <>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
