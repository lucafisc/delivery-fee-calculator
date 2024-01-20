const submitFormWithValues = (
  cartValue: string,
  deliveryDistance: string,
  numberOfItems: string
) => {
  if (cartValue) {
    cy.get('[data-test-id="cartValue"]').type(cartValue);
  }
  if (deliveryDistance) {
    cy.get('[data-test-id="deliveryDistance"]').type(deliveryDistance);
  }
  if (numberOfItems) {
    cy.get('[data-test-id="numberOfItems"]').type(numberOfItems);
  }
  cy.get('[data-test-id="form"]').submit();
};

const checkFee = (fee: string) => {
  const feeText = fee === "--" ? "--" : `${fee}€`;
  cy.get('[data-test-id="fee"]').should("exist").should("have.text", feeText);
};

const clearForm = () => {
  cy.get('[data-test-id="cartValue"]').clear();
  cy.get('[data-test-id="deliveryDistance"]').clear();
  cy.get('[data-test-id="numberOfItems"]').clear();
};

describe("Failed Result Scenarios", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("renders the fee as -- when the form is submitted with no values", () => {
    submitFormWithValues("", "", "");
    checkFee("--");
  });

  it("renders the fee as -- whe the form is submitted without a cart value", () => {
    submitFormWithValues("", "1500", "4");
    checkFee("--");
  });

  it("renders the fee as -- whe the form is submitted without a delivery distance", () => {
    submitFormWithValues("10", "", "4");
    checkFee("--");
  });

  it("renders the fee as -- whe the form is submitted without a number of items", () => {
    submitFormWithValues("10", "1500", "");
    checkFee("--");
  });
});

describe("Successful simple result scenarios", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("renders the fee as 2€ when the form is submitted with basic values", () => {
    submitFormWithValues("10", "10", "4");
    cy.get('[data-test-id="fee"]').should("exist").should("have.text", "2€");
  });

  it("renders the fee with a surcharge when the order is below 10€", () => {
    submitFormWithValues("9", "10", "4");
    checkFee("3");
    clearForm();

    submitFormWithValues("9.99", "10", "4");
    checkFee("2.01");
    clearForm();

    submitFormWithValues("9.999", "10", "4");
    checkFee("2.01");
    clearForm();

    submitFormWithValues("5.43", "10", "4");
    checkFee("6.57");
  });

  it("renders the fee with an additional value for every 500m of distance after the inital 1000m", () => {
    submitFormWithValues("10", "1499", "4");
    checkFee("3");
    clearForm();

    submitFormWithValues("10", "1500", "4");
    checkFee("3");
    clearForm();

    submitFormWithValues("10", "1501", "4");
    checkFee("4");
    clearForm();

    submitFormWithValues("10", "2000", "4");
    checkFee("4");
    clearForm();

    submitFormWithValues("10", "2500", "4");
    checkFee("5");
  });

  it("renders the fee with a surcharge for every item above and including the fifth one", () => {
    submitFormWithValues("10", "1000", "4");
    checkFee("2");
    clearForm();

    submitFormWithValues("10", "1000", "5");
    checkFee("2.50");
    clearForm();

    submitFormWithValues("10", "1000", "6");
    checkFee("3");
    clearForm();

    submitFormWithValues("10", "1000", "7");
    checkFee("3.50");
    clearForm();

    submitFormWithValues("10", "1000", "12");
    checkFee("6");
  });

  it('renders the fee with an extra "bulk" fee when the number of items is above 12', () => {
    submitFormWithValues("10", "1000", "12");
    checkFee("6");
    clearForm();

    submitFormWithValues("10", "1000", "13");
    checkFee("7.70");
    clearForm();

    submitFormWithValues("10", "1000", "14");
    checkFee("8.20");
  });

  it("renders the fee with a maximum value of 15€", () => {
    submitFormWithValues("10", "10000", "12");
    checkFee("15");
    clearForm();

    submitFormWithValues("1", "10000", "1300");
    checkFee("15");
    clearForm();

    submitFormWithValues("199", "10", "9000");
    checkFee("15");
  });

  it("renders the fee as 0€ when the cart value is 200€ or more", () => {
    submitFormWithValues("200", "10000", "12");
    checkFee("0");
    clearForm();

    submitFormWithValues("201", "10000", "1300");
    checkFee("0");
    clearForm();

    submitFormWithValues("200.01", "10", "9000");
    checkFee("0");
  });
});
