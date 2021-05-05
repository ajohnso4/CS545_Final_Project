import axios from "axios";

export async function addFavorite(favId, uid) {
  try {
    const dataRes = await axios({
      url: "http://localhost:8080/api/users/addFavorite",
      method: "put",
      data: {
        favId: favId,
        username: uid,
      },
    });
    console.log(dataRes);
  } catch (e) {
    console.log(e.message);
  }
}
