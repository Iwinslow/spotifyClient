const SCOPE = process.env.REACT_APP_API_SCOPE;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

export const authUserAPILink = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
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
