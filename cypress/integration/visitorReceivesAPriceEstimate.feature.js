describe("Visitor can see an estimated price when successfully submitting locations", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1",
      response: "",
    });
    cy.visit("/");
  });
  it("visitor can fill in route form, see route on map and receive a price estimate", () => {
    cy.get("[data-cy='route-form']").within(() => {
      cy.get("[data-cy='from']").type("Stockholm");
      cy.get("[data-cy='to']").type("Örebro");
      cy.get("[data-cy='submit-route']").click();
    });
  });
});
