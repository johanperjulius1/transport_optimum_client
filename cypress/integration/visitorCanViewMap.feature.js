describe("visitor can submit route", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url:
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=*`,
      response: "fixture:stockholmOrebroResponse.json",
    });
    cy.visit("/");
  });