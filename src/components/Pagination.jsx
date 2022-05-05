import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import style from "../styles/Pagination.module.css";

function Pagination({ currentPage, setCurrentPage, pages }) {
  //Funciones para acceder a la anterior/siguiente pagina
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };
  //Funciones para calcular numeros a renderizar en pantalla de acuerdo a la currentPage
  const previusPagesToRender = (currentPage) => {
    if (currentPage - 1 === 1) {
      return [currentPage - 1];
    }
    if (currentPage - 1 > 1) {
      return [currentPage - 2, currentPage - 1];
    } else {
      return [];
    }
  };
  const nextPagesToRender = (currentPage, pages) => {
    let current = Number(currentPage);
    let totalPages = Number(pages);
    if (totalPages - current === 1) {
      return [current + 1];
    }
    if (totalPages - current > 1) {
      return [current + 1, current + 2];
    } else {
      return [];
    }
  };

  return (
    <div className={style.pagination}>
      <button onClick={prevPage}>
        <FaAngleLeft />
      </button>
      {previusPagesToRender(currentPage).map((num, i) => (
        <span key={i} onClick={(e) => setCurrentPage(e.target.innerHTML)}>
          {num}
        </span>
      ))}
      <span style={{ color: "#d6f379" }}>{currentPage}</span>
      {nextPagesToRender(currentPage, pages).map((num, i) => (
        <span key={i} onClick={(e) => setCurrentPage(e.target.innerHTML)}>
          {num}
        </span>
      ))}
      <button onClick={nextPage}>
        <FaAngleRight />
      </button>
    </div>
  );
}

export default Pagination;
