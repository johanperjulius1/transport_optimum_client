import React from "react";
import { Button, Form, Container } from "semantic-ui-react";
import axios from "axios";


const RouteForm = () => {
  
  const postRoute = async (event) => {
    event.preventDefault();
    try {
      const origin = event.target.origin.value
      const destination = event.target.destination.value

      const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY


      const response = await axios.post(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`)
    }
  }


  return (
    <Container>
      <Form data-cy="route-form">
        <Form.Input
          label="From:"
          placeholder="Type in your location"
          name="origin"
          type="input"
          id="origin"
          data-cy="origin"
        />
        <Form.Input
          label="To:"
          placeholder="Type in your location"
          name="destination"
          type="input"
          id="destination"
          data-cy="destination"
        />
        <Button
          data-cy="submit-route"
          id="submit-route"
          content="Submit Your Route"
        />
      </Form>
    </Container>
  );
};
export default RouteForm;

  // const LoginForm = () => {
  //   const [message, setMessage] = useState();
  //   let location = useLocation();

  
  //   const login = async (event, dispatch, history) => {
  //     event.preventDefault();
  //     try {
  //       const email = event.target.email.value;
  //       const password = event.target.password.value;
  
  //       const response = await auth.signIn(email, password);
  //       dispatch({
  //         type: "AUTHENTICATE",
  //         payload: {
  //           authenticated: response.success,
  //           currentUser: response.data,
  //         },
  //       });
  
  //       history.replace({ pathname: "/" });
  
  //     } catch (error) {
  //       setMessage(error.response.data.errors[0]);
  //     }
  //   };
  
  //   useEffect(() => {
  //     if (location.state) {
  //       setRegistrationMessage(location.state.message);
  //     }
  //   }, [location]);