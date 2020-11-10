describe("visitor can submit route", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=*`,
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
    cy.get("[data-cy='route-information-box']").within(() => {
      cy.get("[data-cy='successful-request']").within(() => {
        cy.get("[data-cy='origin']").should("contain", "Stockholm");
        cy.get("[data-cy='destination']").should("contain", "Örebro");
        cy.get("[data-cy='route-distance']").should("contain", "202 km");
        cy.get("[data-cy='route-time']").should("contain", "2 hours 12 min");
      });
    });
  });

  xcontext("Unsuccessfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=*`,

        status: "NOT_FOUND",
      });
    });

    it("Unsuccessfully with invalid location", () => {
      cy.get("[data-cy='route-form']").within(() => {
        cy.get("[data-cy='from']").type("Stockholm");
        cy.get("[data-cy='to']").type("Ankeborg");
        cy.get("[data-cy='submit-route']").click();
      });

      cy.get("[data-cy='failure-message']").within(() => {
        cy.get("[data-cy='fail-message']").should(
          "contain",
          "Sorry, we don't have that location. Please try again with another location."
        );
        cy.get("[data-cy='route-information-box']").should("not.exist");
            cy.get("['map-renderer]").should("not.exist")
      });
    });
  });
});
