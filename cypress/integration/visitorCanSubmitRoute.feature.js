describe("visitor can submit route", () => {
  context("Successfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "POST",
        url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=*`,
        response: "fixture:stockholmOrebroResponse.json",
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/distance?**",
        response: { price: 12345 },
      });
      cy.visit("/");
    });

    it("visitor filles in form with valid locations", () => {
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

      cy.get("[data-cy='total-price']").should(
        "contain",
        "Our price estimate for this routes is SEK 12345"
      );
    });
  });

  context("Unsuccessfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "POST",
        url: "**/maps/api/**",
        response: "fixture:invalidLocationResponse.json",
      });
      cy.visit("/");
    });

    it("with invalid locations", () => {
      cy.get("[data-cy='route-form']").within(() => {
        cy.get("[data-cy='from']").type("Stockholm");
        cy.get("[data-cy='to']").type("Ankeborg");
        cy.get("[data-cy='submit-route']").click();
      });

      cy.get("[data-cy='failure-message']").within(() => {
        cy.get("[data-cy='fail-message']").should(
          "contain",
          "Something went wrong. Try again with another location."
        );
        cy.get("[data-cy='route-information-box']").should("not.exist");
      });
    });
  });
});
