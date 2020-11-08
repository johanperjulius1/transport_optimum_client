import React, { useState } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import { Route } from "../modules/route_request";
import Map from "./Map"

const RouteForm = () => {
  const [routeInformation, setRouteInformation] = useState();
  const [invalidLocationMessage, setInvalidLocationMessage] = useState("");
  const [from, setFrom] = useState()
  const [to, setTo] = useState()

  const createRoute = async (event) => {
    event.preventDefault();
    setFrom(event.target.origin.value)
    setTo(event.target.destination.value)

    const from = event.target.origin.value;
    const to = event.target.destination.value;
    const response = await Route.create(from, to);

    if (response.status !== 200) {
      setInvalidLocationMessage("Something went wrong. Try again with another location.")
      console.log(response);

    } else if (response.data.status !== "OK") {
      setInvalidLocationMessage(
        "Sorry, we don't have that location. Please try again with another location."
      );
      setRouteInformation(false);
      console.log(response);
    }
    else if (response.data.status === "OK") {
      setRouteInformation(response.data.routes[0].legs[0]);
      setInvalidLocationMessage("");
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

      <Map from={from} to={to}/>
    </Container>
  );
};

export default RouteForm;
