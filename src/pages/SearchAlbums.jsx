import { useState } from "react";
import SearchBar from "../components/SearchBar";

import style from "../styles/SearchAlbums.module.css";

function SearchAlbums() {
  const [searchResult, setSearchResult] = useState({});

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

      {searchResult && <h5>Guarda tus álbumes favoritos de </h5>}
    </div>
  );
}

export default SearchAlbums;
