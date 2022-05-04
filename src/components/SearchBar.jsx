import { useSelector } from "react-redux";
import { useState } from "react";
import { searchByArtist } from "../services/searchServices";

import style from "../styles/SearchBar.module.css";

function SearchBar({ setSearchResult }) {
  const [searchKey, setSearchKey] = useState("");
  const userToken = useSelector((state) => state.user.token);

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchByArtist(searchKey, userToken);
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
