import axios from "axios";

export const searchByArtist = async (searchKey, userToken) => {
  console.log("data", searchKey, userToken);
  const data = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: {
      q: searchKey,
      type: "artist",
    },
  });

  console.log("busqueda result", data);
  return data;
};
