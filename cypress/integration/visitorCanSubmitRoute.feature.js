describe("visitor can submit route", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000",
      response: "",
    });
    cy.visit("/");
  });

  it("visitor can see route form", () => {
    cy.get("[data-cy='route-form']").should("be.visible");
  });

  it("visitor can fill in route form", () => {
    cy.get("[data-cy='route-form']").within(() => {
      cy.get("[data-cy='origin']").type("Stockholm");
      cy.get("[data-cy='destination']").type("Orebro");
      cy.get("[data-cy='submit-route']").click();
    });
  });

  context("successfully created route", () => {
    it("displays the correct route information", () => {
      cy.get("[data-cy='route-information']").within(() => {
        cy.get("[data-cy='route-message']").should("contain", "Your route")
        cy.get("[data-cy='origin']").should("contain", "Stockholm");
        cy.get("[data-cy='destination']").should("contain", "Orebro");
        cy.get("[data-cy='route-distance']").should("contain", "193 km");
        cy.get("[data-cy='route-time']").should("contain", "2h 45min")
      });
    });
  });
});
