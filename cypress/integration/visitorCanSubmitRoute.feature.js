describe("visitor can submit route", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url:
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Stockholm&destination=Orebro&key=AIzaSyAwzUCN-8dHZY6cMYq-zqL_Q9qY_8O9qlw",
      response: "fixture:stockholmOrebroResponse.json",
    });
    cy.visit("/");
  });

  it("visitor can see route form", () => {
    cy.get("[data-cy='route-form']").should("be.visible");
  });

  it("visitor can fill in route form", () => {
    cy.get("[data-cy='route-form']").within(() => {
      cy.get("[data-cy='formOrigin']").type("Stockholm");
      cy.get("[data-cy='formDestination']").type("Orebro");
      cy.get("[data-cy='submit-route']").click();
    });

    cy.get("[data-cy='route-information']").within(() => {
      cy.get("[data-cy='confirmation-message']").within(() => {
        cy.get("[data-cy='origin']").should("contain", "Stockholm");
        cy.get("[data-cy='destination']").should("contain", "Örebro");
        cy.get("[data-cy='route-distance']").should("contain", "202 km");
        cy.get("[data-cy='route-time']").should("contain", "2 hours 12 min");
      });
    });
  });

  context("Unsuccessfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url:
          "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Stockholm&destination=sajelgskjbg&key=AIzaSyAwzUCN-8dHZY6cMYq-zqL_Q9qY_8O9qlw",
        response: { message: "Cannot find location." },
        status: 404,
      });
    });

    it("Unsuccessfully", () => {
      cy.get("[data-cy='route-form']").within(() => {
        cy.get("[data-cy='formOrigin']").type("Stockholm");
        cy.get("[data-cy='formDestination']").type("sajelgskjbg");
        cy.get("[data-cy='submit-route']").click();
      });

      cy.get("[data-cy='failure-message']").within(() => {
        cy.get("[data-cy='fail-message']").should(
          "contain",
          "Cannot find location."
        );
      });
    });
  });

  it("invalid location", () => {
    cy.get('[data-cy="route-form"]').within(() => {
      cy.get('[data-cy="origin"]').type("Orebronx");
      cy.get('[data-cy="destination"]').type("Gothenburg");
      cy.get('[data-cy="submit-route"]').click();
    });
    cy.get('[data-cy="message"]').should(
      "contain",
      "Invalid Location. Please try again."
    );
  });
});
