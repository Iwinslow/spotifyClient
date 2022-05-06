import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

import { saveUserAlbum, removeUserAlbum } from "../store/user";

import style from "../styles/Card.module.css";

function Card({ album, btnColor, btnMessage, textColor, btnFunction }) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { name, images, release_date, id } = album;

  const btnAction = (action) => {
    if (action === "add") {
      dispatch(saveUserAlbum({ userToken, id })).then(() => {
        swal({
          text: "Album agregado correctamente",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
      });
    }
    if (action === "remove") {
      dispatch(removeUserAlbum({ userToken, id })).then(() => {
        swal({
          text: "El album ha sido removido",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={images[0].url} alt="album photo" />
      </div>
      <span>{name}</span>
      <p>Publicado: {release_date}</p>
      {btnDisabled ? (
        <button
          style={{ background: `#cccccc`, color: `#666666` }}
          disabled={btnDisabled}
        >
          ¡Agregado!
        </button>
      ) : (
        <button
          style={{ background: `${btnColor}`, color: `${textColor}` }}
          disabled={btnDisabled}
          onClick={() => {
            btnAction(btnFunction);
            setBtnDisabled(true);
          }}
        >
          {btnMessage}
        </button>
      )}
    </div>
  );
}

export default Card;
