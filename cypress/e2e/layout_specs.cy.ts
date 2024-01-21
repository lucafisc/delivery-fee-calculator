describe("App Load and Layout Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("renders the app title", () => {
    cy.get('[data-test-id="appTitle"]')
      .should("exist")
      .should("have.text", "DeliveryFeeCalculator");
  });

  it("renders the fee as -- on initial load", () => {
    cy.get('[data-test-id="fee"]').should("exist").should("have.text", "--");
  });

  it("has inputs for cart value, delivery distance, number of items and order time", () => {
    cy.get('[data-test-id="cartValue"]').should("exist");
    cy.get('[data-test-id="deliveryDistance"]').should("exist");
    cy.get('[data-test-id="numberOfItems"]').should("exist");
    cy.get('[data-test-id="orderTime"]').should("exist");
  });
});

