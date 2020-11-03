import React from "react";
import { Button, Form, Container } from "semantic-ui-react";
import axios from "axios";

const RouteForm = () => {
  const postRoute = async (event) => {
    event.preventDefault();
    debugger
    try {
      debugger
      const origin = event.target.origin.value;
      const destination = event.target.destination.value;

      const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
      );
      debugger
    } catch(error) {
      debugger
    }
  }

  return (
    <Container>
      <Form data-cy="route-form" onSubmit={(event) => postRoute(event)}>
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
        >
        </Button>
      </Form>
    </Container>
  );
};
export default RouteForm;
