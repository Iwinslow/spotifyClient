import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { searchByArtist } from "../services/searchServices";
import { userLogout } from "../store/user";

import style from "../styles/SearchBar.module.css";

function SearchBar({ setSearchResult }) {
  //Selector de variable global USER para request de busqueda
  const userToken = useSelector((state) => state.user.token);
  //Instancia de useDispatch para realizar logout del usuario en caso de que el token haya expirado
  const dispatch = useDispatch();
  //Declaracion de variables locales
  const [searchKey, setSearchKey] = useState("");
  const [btnstate, setBtnstate] = useState(true);

  //Funcion que actualiza el estado de searchKey
  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };
  //Efecto secundario que se actualiza cada vez que cambia searchKey. Habilita o deshabilita el Boton SEARCH
  useEffect(() => {
    searchKey.length === 0 ? setBtnstate(true) : setBtnstate(false);
  }, [searchKey]);

  //Consume el servicio de busqueda de albumes por artista, en caso de que el token haya expirado consume action logout, caso contrario setea el resultado de busqueda (searchResult) con las keys esperadas.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await searchByArtist(searchKey, userToken);
    if (result === "The access token expired") {
      dispatch(userLogout());
    } else {
      let pages = Math.ceil(result.length / 4);
      setSearchResult({
        key: searchKey,
        result,
        pages,
      });
    }
  };

  return (
    <>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} />
          <button type="submit" disabled={btnstate}>
            Search
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
