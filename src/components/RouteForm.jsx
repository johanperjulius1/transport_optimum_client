import React, { useState } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import axios from "axios";
import { postRoute } from "../modules/route_request";

const RouteForm = () => {
  const [routeInformation, setRouteInformation] = useState();
  const [failureMessage, setFailureMessage] = useState("");

  const postRoute = async (event) => {
    event.preventDefault();
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

  return (
    <Container>
      {routeInformation && (
        <Message data-cy="route-information">
          <Message.Header className="route" data-cy="confirmation-message">
            Your route:
            <div className="origin" data-cy="origin">
              Starting point - {routeInformation.start_address}
            </div>
            <div className="destination" data-cy="destination">
              Destination - {routeInformation.end_address}
            </div>
            <div className="route-distance" data-cy="route-distance">
              Distance: {routeInformation.distance.text}
            </div>
            <div className="route-time" data-cy="route-time">
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
          required
        />
        <Button
          data-cy="submit-route"
          id="submit-route"
          content="Submit Your Route"
          color="green"
        ></Button>
      </Form>
      {failureMessage && (
        <div id="failure-box" data-cy="failure-message">
          <Message.Header id="fail-message" data-cy="fail-message">
            {failureMessage}
          </Message.Header>
        </div>
      )}
    </Container>
  );
};

export default RouteForm;
