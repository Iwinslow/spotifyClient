import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaReact } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";

import { userLogout } from "../store/user";
import { themeToggle } from "../store/theme";

import style from "../styles/Navbar.module.css";

function Navbar() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const userTheme = useSelector((state) => state.theme.darktheme);

  const changeTheme = () => {
    dispatch(themeToggle(userTheme));
  };

  return (
    <header>
      <nav className={style.navbar}>
        <div className={style.container}>
          <h1 className={style.siteName}>React.Music</h1>
          {userToken && (
            <>
              <FaReact />
              <div className={style.panelContainer}>
                <Link to="/">Buscar</Link>
                <Link to="/me">My albums</Link>
              </div>
              <button
                className={style.logoutString}
                onClick={() => dispatch(userLogout())}
              >
                Cerrar sesión
              </button>
              <button
                className={style.logoutButton}
                onClick={() => dispatch(userLogout())}
              >
                <IoLogOutOutline />
              </button>

              {userTheme === true ? (
                <button className={style.themeButton} onClick={changeTheme}>
                  <BsSun />
                </button>
              ) : (
                <button className={style.themeButton} onClick={changeTheme}>
                  <BsMoon />
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
