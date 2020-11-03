import React, { useState } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import axios from "axios";

const RouteForm = () => {
  const [routeInformation, setRouteInformation] = useState();
  const postRoute = async (event) => {
    event.preventDefault();
    try {
      const origin = event.target.origin.value;
      const destination = event.target.destination.value;

      const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`,
        { headers: "Access-Control-Allow-Origin" }
      );
      setRouteInformation(response.data.routes[0].legs[0]);
    } catch (error) {}
  };

  return (
    <Container>
      {routeInformation && (
        <Message data-cy="route-information">
          <Message.Header data-cy="confirmation-message">
            Your route
            <br /> Starting point: {routeInformation.start_address}
            Destination: {routeInformation.end_address}
            <br /> Distance: {routeInformation.distance.text}
            <br /> Duration: {routeInformation.duration.text}
          </Message.Header>
        </Message>
      )}
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
          color="green"
        ></Button>
      </Form>
    </Container>
  );
};
export default RouteForm;
