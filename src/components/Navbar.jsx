import { useSelector, useDispatch } from "react-redux";
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
          {!userToken && <h1>REACT.MUSIC</h1>}

          {userToken && (
            <>
              <div className={style.titleContainer}>
                <h1 className={style.siteName}>REACT.MUSIC</h1>
                <FaReact />
              </div>
              <div className={style.panelContainer}>
                <Link to="/">Buscar</Link>
                <Link to="/me">My albums</Link>
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
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
