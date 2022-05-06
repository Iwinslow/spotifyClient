import { FaArrowRight } from "react-icons/fa";
import { authUserAPILink } from "../services/userServices";

import arrowLogin from "../assets/arrow.svg";

import style from "../styles/Login.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/user";
import swal from "sweetalert";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Toma el token que coloca Spotify como hash, lo formatea y coloca en redux y local storage,
  //Luego redirecciona a /search
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      dispatch(userLogin(token)).then(() =>
        swal({
          text: "¡Bienvenido!",
          icon: "success",
          timer: 2000,
          buttons: false,
        })
      );
      navigate("/search");
    }
  });

  return (
    <>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <img src={arrowLogin} alt="go login" />
        </div>
        <div className={style.contentContainer}>
          <div className={style.textContainer}>
            <h3>Disfruta de la</h3>
            <h3>mejor música</h3>
            <p>Accede a tu cuenta para guardar tus albumes favoritos.</p>
          </div>
          <div className={style.loginButton}>
            <h5>Log in con Spotify</h5>
            <a href={authUserAPILink()}>
              <FaArrowRight />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
