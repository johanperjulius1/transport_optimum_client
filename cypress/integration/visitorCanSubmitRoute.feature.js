describe("visitor can submit route", () => {
  beforeEach(() => {
    cy.server();
    // cy.route({
    //   method: "POST",
    //   url: "http://localhost:3000",
    //   response: "fixture:stockholmOrebroResponse.json",
    // });
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
});

// const [message, setMessage] = useState()
