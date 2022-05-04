import axios from "axios";

export const searchByArtist = async (searchKey, userToken) => {
  try {
    const data = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        q: searchKey,
        type: "album",
      },
    });
    return data.data.albums.items;
  } catch (error) {
    let errorMsj = error.response.data.error.message;
    if (errorMsj === "The access token expired") {
      return errorMsj;
    } else {
      console.log(error.message);
    }
  }
};
