import React, { useState } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import { calculateRoute } from "../modules/route_request";

const RouteForm = () => {
  const [routeInformation, setRouteInformation] = useState();
  const [invalidLocationMessage, setInvalidLocationMessage] = useState("");

  const createRoute = async (event) => {
    event.preventDefault();

    const from = event.target.origin.value;
    const to = event.target.destination.value;
    const response = await calculateRoute.create(from, to);
    if (response === "Request failed with status code 400") {
      setInvalidLocationMessage("Request failed with status code 400")
    } else if (response.data.status !== "NOT_FOUND") {
      setRouteInformation(response.data.routes[0].legs[0]);
      setInvalidLocationMessage("");
    } else if (response.data.status === "NOT_FOUND") {
      setInvalidLocationMessage(
        "Cannot find location, please try again with another location."
      );
      setRouteInformation(false);
      console.log(response);
    }
  };

  return (
    <Container>
      {routeInformation && (
        <Message data-cy="route-information-box">
          <Message.Header className="route" data-cy="successful-request">
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
      {invalidLocationMessage && (
        <div id="failure-box" data-cy="failure-message">
          <Message.Header id="fail-message" data-cy="fail-message">
            {invalidLocationMessage}
          </Message.Header>
        </div>
      )}
    </Container>
  );
};

export default RouteForm;
