import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

import style from "../styles/SearchAlbums.module.css";

function SearchAlbums() {
  //Declaración de variables locales y sus estados
  //SearchResult se configura en el componente SearchBar.jsx y alimenta el render principal de la Page
  //currentPage alimenta el componente Pagination.jsx
  const [searchResult, setSearchResult] = useState({
    key: "",
    pages: null,
    result: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

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

      {searchResult.pages === 0 && <h5>No se han encontrado resultados</h5>}

      {searchResult.key && searchResult.pages > 0 && (
        <>
          <h5>Guarda tus álbumes favoritos de {searchResult.key}</h5>
          <div className={style.albumsContainer}>
            {searchResult.result &&
              searchResult.result
                .slice(currentPage * 4 - 4, currentPage * 4)
                .map((e, i) => <Card album={e} key={i} />)}
          </div>
        </>
      )}

      {searchResult.pages > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={searchResult.pages}
        />
      )}
    </div>
  );
}

export default SearchAlbums;
