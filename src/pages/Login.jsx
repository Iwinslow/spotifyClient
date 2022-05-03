import { FaArrowRight } from "react-icons/fa";

import arrowLogin from "../assets/arrow.svg";

import style from "../styles/Login.module.css";

function Login() {
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
          <FaArrowRight />
        </div>
      </div>
    </>
  );
}

export default Login;
