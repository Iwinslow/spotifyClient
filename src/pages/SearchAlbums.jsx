import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

import style from "../styles/SearchAlbums.module.css";

function SearchAlbums() {
  const [searchResult, setSearchResult] = useState({
    key: "",
    result: [],
  });

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h2>Busca tus</h2>
        <h2>albumes</h2>
        <p>
          Encuentra tus artistas favoritos gracias a nuestro buscador y guarda
          tus álbumes favoritos.
        </p>
      </div>

      <SearchBar setSearchResult={setSearchResult} />

      {searchResult.key && (
        <h5>Guarda tus álbumes favoritos de {searchResult.key}</h5>
      )}
      <div className={style.albumsContainer}>
        {searchResult.result &&
          searchResult.result.map((e, i) => <Card album={e} key={i} />)}
      </div>
    </div>
  );
}

export default SearchAlbums;
