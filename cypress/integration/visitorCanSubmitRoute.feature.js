describe("visitor can submit route", () => {
  const apiKey = process.env.REACT_APP_MAPSDIRECTIONS_API_KEY
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url:
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Stockholm&destination=Orebro**`,
      response: "fixture:stockholmOrebroResponse.json",
    });
    cy.visit("/");
  });

  it("visitor can fill in route form", () => {
    cy.get("[data-cy='route-form']").within(() => {
      cy.get("[data-cy='from']").type("Stockholm");
      cy.get("[data-cy='to']").type("Örebro");
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
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Stockholm&destination=Ankeborg&key=**`,
        response: { message: "Cannot find location." },
        status: 404,
      });
    });

    it("Unsuccessfully", () => {
      cy.get("[data-cy='route-form']").within(() => {
        cy.get("[data-cy='from']").type("Stockholm");
        cy.get("[data-cy='to']").type("Ankeborg");
        cy.get("[data-cy='submit-route']").click();
      });

      cy.get("[data-cy='failure-message']").within(() => {
        cy.get("[data-cy='fail-message']").should(
          "contain",
          "Cannot find location, please try again with another location."
        );
        cy.get("[data-cy='route-information']").should("not.exist")
      });
    });
  });
});
