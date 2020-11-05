import React, { useState } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import getRoute from "../modules/route_request";

const RouteForm = () => {
  const [routeInformation, setRouteInformation] = useState();
  const [failureMessage, setFailureMessage] = useState("");

  const createRoute = async (event) => {
    event.preventDefault();

    const from = event.target.origin.value;
    const to = event.target.destination.value;
    const response = await getRoute.create(from, to)
    if (response.data) {
      debugger
      setRouteInformation(response.data.routes[0].legs[0]);
      setFailureMessage("");
    } else {
      debugger
      setFailureMessage(response);
      setRouteInformation(false)
      console.log(response);
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

      <Form data-cy="route-form" onSubmit={(event) => createRoute(event)}>
        <Form.Input
          label="From:"
          placeholder="Type in your location"
          name="origin"
          type="input"
          id="from"
          data-cy="from"
          required
        />
        <Form.Input
          label="To:"
          placeholder="Type in your location"
          name="destination"
          type="input"
          id="to"
          data-cy="to"
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
