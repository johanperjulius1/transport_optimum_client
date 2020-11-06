import axios from "axios";

const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

const calculateRoute = {
  async create(from, to) {
    let response;
    try {
      response = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&key=${apiKey}`,
        {
          headers: "Access-Control-Allow-Origin",
        }
      ); 
      return response;
    } catch (error) {debugger
      response = error.message
      return response
    } finally {
      return response
    }
  },
};

export { calculateRoute };
