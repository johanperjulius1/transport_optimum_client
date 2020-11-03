import React from "react";
import { Button, Form, Container } from "semantic-ui-react";

const RouteForm = () => {
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
