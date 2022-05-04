import style from "../styles/Card.module.css";

function Card({ album }) {
  const { name, images, release_date } = album;

  const addAlbum = () => {};

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={images[0].url} alt="album photo" />
      </div>
      <span>{name}</span>
      <p>Publicado: {release_date}</p>
      <button onClick={addAlbum}>+Add album</button>
    </div>
  );
}

export default Card;
