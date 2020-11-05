import axios from 'axios'

const postRoute = async (event) => {
  
  try {
    const formOrigin = event.target.origin.value;
    const formDestination = event.target.destination.value;
    const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

    const response = await axios.post(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${formOrigin}&destination=${formDestination}&key=${apiKey}`,
      { headers: "Access-Control-Allow-Origin" }
    );
    setRouteInformation(response.data.routes[0].legs[0]);
    setFailureMessage(true);
  } catch (error) {
    setFailureMessage("Cannot find location, please try again with another location.");
    setRouteInformation(false)
    console.log(error);
  }
}

export default postRoute