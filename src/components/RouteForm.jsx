import React, { useState } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import axios from "axios";

const RouteForm = () => {
  const [routeInformation, setRouteInformation] = useState();
  const postRoute = async (event) => {
    event.preventDefault();
    try {
      const formOrigin = event.target.origin.value;
      const formDestination = event.target.destination.value;

      const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY;

      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${formOrigin}&destination=${formDestination}&key=AIzaSyAwzUCN-8dHZY6cMYq-zqL_Q9qY_8O9qlw`,
        { headers: "Access-Control-Allow-Origin" }
      );
      setRouteInformation(response.data.routes[0].legs[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {routeInformation && (
        <Message data-cy="route-information">
          <Message.Header data-cy="confirmation-message">
            Your route
            <div data-cy="origin">
              Starting point: {routeInformation.start_address}
            </div>
            <div data-cy="destination">
              Destination: {routeInformation.end_address}
            </div>
            <div data-cy="route-distance">
              Distance: {routeInformation.distance.text}
            </div>
            <div data-cy="route-time">
              Duration: {routeInformation.duration.text}
            </div>
          </Message.Header>
        </Message>
      )}

      <Form data-cy="route-form" onSubmit={(event) => postRoute(event)}>
        <Form.Input
          label="From:"
          placeholder="Type in your location"
          name="origin"
          type="input"
          id="formOrigin"
          data-cy="formOrigin"
          required
        />
        <Form.Input
          label="To:"
          placeholder="Type in your location"
          name="destination"
          type="input"
          id="formDestination"
          data-cy="formDestination"
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
