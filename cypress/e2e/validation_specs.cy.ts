import { submitFormWithValues, checkFee } from "./testUtils";

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

  describe("Order Time Input Validation Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });

    it("allows only numbers in the order time", () => {
      cy.get('[data-test-id="orderTime"]')
      .type("22.09.19a92 12:24{enter}")
      .should("have.value", "22.09.2019 00:00");
    })
  });

  describe("Result reset", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
      submitFormWithValues("10", "1000", "14", "25.01.2024 18:59");
    });

    it("resets the result when the cart value is changed", () => {
      cy.get('[data-test-id="cartValue"]')
        .clear()
        .type("100")
        .should("have.value", "100");
      checkFee("--");
    });

    it("resets the result when the delivery distance is changed", () => {
      cy.get('[data-test-id="deliveryDistance"]')
        .clear()
        .type("100")
        .should("have.value", "100");
      checkFee("--");
    });

    it("resets the result when the number of items is changed", () => {
      cy.get('[data-test-id="numberOfItems"]')
        .clear()
        .type("100")
        .should("have.value", "100");
      checkFee("--");
    });

    it("resets the result when the order time is changed", () => {
      cy.get('[data-test-id="orderTime"]')
        .clear()
        .type("25.01.2024 19:00{enter}")
        .should("have.value", "25.01.2024 19:00");
      checkFee("--");
    });
});
