import axios from "axios";

const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

const Route = {
  async create(from, to) {
    let response;

    try {
      response = await axios({
        method: "post",
        url:
          "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json",
        params: {
          origin: from,
          destination: to,
          key: apiKey,
        },
      });
      return response;
    } catch (error) {
      response = error.message;
      return response;
    } finally {
      return response;
    }
  },
};

export { Route };
