import axios from "axios";

const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://transport-optimum.herokuapp.com/api/v1";
} else {
  apiUrl = "http://localhost:3000/api/v1";
}
axios.defaults.baseURL = apiUrl;

const Route = {
  async create(from, to) {
    let result;

    try {
      let response = await axios({
        method: "post",
        url:
          "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json",
        params: {
          origin: from,
          destination: to,
          key: apiKey,
        },
      });
      if (response.data.status === "OK") {
        result = response.data.routes[0];
      } else {
        throw new Error(
          "Something went wrong. Try again with another location."
        );
      }
    } catch (error) {
      result = error.message;
    } finally {
      return result;
    }
  },

  async getPrice(distance) {
    let result;
    try {
      let response = await axios({
        method: "post",
        url: `${apiUrl}/distance`,
        params: { distance: distance },
      });
      result = response.data.price;
    } catch (error) {
      result = error.message;
    } finally {
      return result;
    }
  },
};

export { Route };
