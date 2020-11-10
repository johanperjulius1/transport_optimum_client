import axios from "axios";
import { create } from "react-test-renderer";

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
 
  async create(distance) {
    let result;
    try {
      result = await axios({
        method: "post",
        url:`${apiUrl}/distance`,
        params: {distance: distance 

        },
      });
      return result;
    } catch (error) {
      result = error.message;
      return result;
    } finally {
      return result;
    }
  },

  }


export { Route };
