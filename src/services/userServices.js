import axios from "axios";

//VARIABLES DE ENTORNO
/////Debera modificar las siguientes variables con sus datos para correr el proyecto localmente:
const SCOPE = process.env.REACT_APP_API_SCOPE;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
/////Tambien debera modificar la seccion "...&redirect_uri=XXXX" del AUTH_URL por la redirect_uri establecida en su proyecto de spotify
export const authUserAPILink = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=https://ivan-winslow-frontend.vercel.app/&response_type=token&scope=${SCOPE}`;
  return AUTH_URL;
};

//SERVICIOS UTILIZADOS PARA LA SESION DEL USUARIO EN EL CLIENTE:
export const userLoginService = (token) => {
  //Setea el token en el localStorage del cliente
  localStorage.setItem("token", token);
  //El resultado configurara el payload que sera asignado por el reducer en el storage como variable global(user.token)
  return token;
};

export const userLogout = () => {
  //Remueve el token del localStorage del cliente
  localStorage.removeItem("token");
  //Tras ejecutarse la ACTION que hace referencia a este servicio, el reducer eliminara del storage el token
  //Este servicio se consume en dos situaciones (siempre mediante la Action userLogout):
  ////a) Cuando el usuario cierra su sesion
  ////b) Cuando el token ha expirado
};

//SERVICIOS UTILIZADOS PARA LEER Y ACTUALIZAR (PUT/DELETE en Spotify)  LOS ALBUMES DEL USUARIO:
export const getAlbums = async (userToken) => {
  try {
    //Solicita a spotify todos los albums del usuario
    const res = await axios.get("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        limit: 50,
      },
    });
    const items = res.data.items;

    //La respuesta es formateada y organizada para facilitar su exposicion por ARTISTA en la page Profile
    //En caso de recibir "The access token expired", resetea el token en el localStorage y redux. Luego redirecciona a Login
    const data = items.map((item) => {
      let artistName = item.album.artists[0].name;

      let albumsOfThis = items.filter((i) => {
        return i.album.artists[0].name === artistName;
      });

      return {
        artist: artistName,
        albums: albumsOfThis,
      };
    });
    const albumsPerArtist = [
      ...data.reduce((map, obj) => map.set(obj.artist, obj.albums), new Map()),
    ];
    return albumsPerArtist;
  } catch (error) {
    let errorMsj = error.response.data.error.message;
    if (errorMsj === "The access token expired") {
      userLogout();
      return errorMsj;
    } else {
      console.log(error.message);
    }
  }
};
//Agrega un album a los guardados del usuario utilizando su token y el id del album
//En caso de recibir "The access token expired", resetea el token en el localStorage y redux. Luego redirecciona a Login
export const saveAlbum = async ({ userToken, id }) => {
  try {
    const data = await axios({
      method: "put",
      url: "https://api.spotify.com/v1/me/albums",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        ids: [`${id}`],
      },
    });
    const newAlbumsState = await getAlbums(userToken);
    return newAlbumsState;
  } catch (error) {
    let errorMsj = error.response.data.error.message;
    if (errorMsj === "The access token expired") {
      userLogout();
      return errorMsj;
    } else {
      console.log(error.message);
    }
  }
};

//Remueve un album especifico de los guardados por el usuario, utilizando su token y  el id del album.
//En caso de recibir "The access token expired", resetea el token en el localStorage y redux. Luego redirecciona a Login
export const removeAlbum = async ({ userToken, id }) => {
  try {
    const data = await axios({
      method: "delete",
      url: "https://api.spotify.com/v1/me/albums",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        ids: `${id}`,
      },
    });
    const newAlbumsState = await getAlbums(userToken);
    return newAlbumsState;
  } catch (error) {
    let errorMsj = error.response.data.error.message;
    if (errorMsj === "The access token expired") {
      userLogout();
      return errorMsj;
    } else {
      console.log(error.message);
    }
  }
};
