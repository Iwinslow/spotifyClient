import { getUserAlbums, userLogout } from "../store/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { FaReact, FaSpotify } from "react-icons/fa";

import Card from "../components/Card";

import style from "../styles/Profile.module.css";

function Profile() {
  const userAlbums = useSelector((state) => state.user.albums);
  const userAlbumsLoad = useSelector((state) => state.user.loading);
  const userToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAlbums(userToken));
    if (userAlbums === "The access token expired") {
      dispatch(userLogout());
    }
  }, [userToken]);

  return (
    <div className={style.container}>
      {userAlbumsLoad ? (
        <div className={style.loadingContainer}>
          <FaReact />
          <FaSpotify />
        </div>
      ) : (
        <>
          <div className={style.titleContainer}>
            <h2>Mis albumes</h2>
            <h2>guardados</h2>
            <p>
              Disfruta de tu música a un solo click y descubre que discos has
              guardado dentro de "mis álbumes"
            </p>
          </div>
          {userAlbums.length === 0 ? (
            <div>No ha guardado albumes todavía</div>
          ) : (
            <div className={style.albumsContainer}>
              {userAlbums.map((artistSection, i) => (
                <>
                  <div className={style.artistName} key={i}>
                    {artistSection[0]}
                  </div>
                  {artistSection[1].map((e) => (
                    <Card
                      album={e.album}
                      btnColor="#E3513D"
                      btnMessage="-Remove album"
                      textColor="#ffff"
                      btnFunction="remove"
                    />
                  ))}
                </>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
