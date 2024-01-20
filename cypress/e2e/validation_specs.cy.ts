describe("Cart Value Input Validation Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("allows only two decimal places in the cart value", () => {
      cy.get('[data-test-id="cartValue"]')
        .type("9.6000")
        .should("have.value", "9.60");
    });
  
    it("allows no more than one dot in the cart value", () => {
      cy.get('[data-test-id="cartValue"]')
        .type("9.60.00")
        .should("have.value", "9.60")
        .clear()
        .type("9..00")
        .should("have.value", "9.00");
    });
  
    it("allows only numbers in the cart value", () => {
      cy.get('[data-test-id="cartValue"]')
        .type("9a")
        .should("have.value", "9")
        .clear()
        .type("9.6a0")
        .should("have.value", "9.60");
    });
  
    it("allows only one leading zero in the cart value", () => {
      cy.get('[data-test-id="cartValue"]')
        .type("00")
        .should("have.value", "0")
        .clear()
        .type("00.90")
        .should("have.value", "0.90");
    });
  });
  
  describe("Delivery Distance and Number of Items Input Validation Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("allows only numbers in the delivery distance and number of items", () => {
      cy.get('[data-test-id="deliveryDistance"]')
        .type("9a")
        .should("have.value", "9")
        .clear()
        .type("aaaaa88")
        .should("have.value", "88");
  
      cy.get('[data-test-id="numberOfItems"]')
        .type("9a")
        .should("have.value", "9")
        .clear()
        .type("aaaaa88")
        .should("have.value", "88");
    });
  
    it("allows only whole numbers in the delivery distance and number of items", () => {
      cy.get('[data-test-id="deliveryDistance"]')
        .type("9.60")
        .should("have.value", "960");
  
      cy.get('[data-test-id="numberOfItems"]')
        .type("9.60")
        .should("have.value", "960");
    });
  
    it("allows no leading zero in the delivery distance and number of items", () => {
      cy.get('[data-test-id="deliveryDistance"]')
        .type("0090")
        .should("have.value", "90");
  
      cy.get('[data-test-id="numberOfItems"]')
        .type("0090")
        .should("have.value", "90");
    });
  });