import { useSelector, useDispatch } from "react-redux";

import { saveUserAlbum, removeUserAlbum } from "../store/user";

import style from "../styles/Card.module.css";

function Card({ album, btnColor, btnMessage, textColor, btnFunction }) {
  const dispatch = useDispatch();
  const { name, images, release_date, id } = album;
  const userToken = useSelector((state) => state.user.token);

  const btnAction = (action) => {
    if (action === "add") {
      dispatch(saveUserAlbum({ userToken, id }));
    }
    if (action === "remove") {
      dispatch(removeUserAlbum({ userToken, id }));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={images[0].url} alt="album photo" />
      </div>
      <span>{name}</span>
      <p>Publicado: {release_date}</p>
      <button
        style={{ background: `${btnColor}`, color: `${textColor}` }}
        onClick={() => btnAction(btnFunction)}
      >
        {btnMessage}
      </button>
    </div>
  );
}

export default Card;
