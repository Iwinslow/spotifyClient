import { FaArrowRight } from "react-icons/fa";
import { authUserAPILink } from "../services/userServices";

import arrowLogin from "../assets/arrow.svg";

import style from "../styles/Login.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/user";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.search) {
      const token = window.location.search.replace("?code=", "");
      dispatch(userLogin(token));
      navigate("/search");
    }
  }, []);

  return (
    <>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <img src={arrowLogin} alt="go login" />
        </div>
        <div className={style.textContainer}>
          <h3>Disfruta de la</h3>
          <h3>mejor música</h3>
          <h5>Accede a tu cuenta para guardar tus albumes favoritos.</h5>
        </div>
        <div className={style.loginButton}>
          <h5>Log in con Spotify</h5>
          <a href={authUserAPILink()}>
            <FaArrowRight />
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
