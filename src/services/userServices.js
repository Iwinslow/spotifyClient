import axios from "axios";

const SCOPE = process.env.REACT_APP_API_SCOPE;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

export const authUserAPILink = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=https://ivan-winslow-frontend.vercel.app/&response_type=token&scope=${SCOPE}`;
  return AUTH_URL;
};

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

export const getAlbums = async (userToken) => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        limit: 50,
      },
    });

    const items = res.data.items;

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

export const saveAlbum = async ({ userToken, id }) => {
  console.log(userToken);
  console.log(id);
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

export const removeAlbum = async ({ userToken, id }) => {
  try {
    console.log(userToken);
    console.log(id);
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
    console.log(newAlbumsState);
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
