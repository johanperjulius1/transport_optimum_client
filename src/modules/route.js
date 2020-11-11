import axios from "axios";

const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

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
        url: "/distance",
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
