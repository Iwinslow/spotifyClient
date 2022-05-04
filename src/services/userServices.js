const SCOPE = process.env.REACT_APP_API_SCOPE;

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
//const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

export const authUserAPILink = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
  console.log(AUTH_URL);
  return AUTH_URL;
};

export const userLoginService = (token) => {
  //Setea el token en el localStorage del usuario
  localStorage.setItem("token", token);

  return token;
};

export const userLogout = () => {};
