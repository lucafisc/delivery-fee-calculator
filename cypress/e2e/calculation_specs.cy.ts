import { submitFormWithValues, checkFee, clearForm } from "./testUtils.tsx";

describe("Failed Result Scenarios", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("renders the fee as -- when the form is submitted with no values", () => {
    submitFormWithValues("", "", "", "");
    checkFee("--");
  });

  it("renders the fee as -- whe the form is submitted without a cart value", () => {
    submitFormWithValues("", "1500", "4", "21.01.2024 13:50");
    checkFee("--");
  });

  it("renders the fee as -- whe the form is submitted without a delivery distance", () => {
    submitFormWithValues("10", "", "4", "21.01.2024 13:50");
    checkFee("--");
  });

  it("renders the fee as -- whe the form is submitted without a number of items", () => {
    submitFormWithValues("10", "1500", "", "21.01.2024 13:50");
    checkFee("--");
  });

  it("renders the fee as -- whe the form is submitted without an order time", () => {
    submitFormWithValues("10", "1500", "4", "");
    checkFee("--");
  });
});

describe("Successful simple result scenarios", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("renders the fee as 2€ when the form is submitted with basic values", () => {
    submitFormWithValues("10", "10", "4", "21.01.2024 13:50");
    cy.get('[data-test-id="fee"]').should("exist").should("have.text", "2€");
  });

  it("renders the fee with a surcharge when the order is below 10€", () => {
    submitFormWithValues("9", "10", "4", "21.01.2024 13:50");
    checkFee("3");
    clearForm();

    submitFormWithValues("9.99", "10", "4", "21.01.2024 13:50");
    checkFee("2.01");
    clearForm();

    submitFormWithValues("9.999", "10", "4", "21.01.2024 13:50");
    checkFee("2.01");
    clearForm();

    submitFormWithValues("5.43", "10", "4", "21.01.2024 13:50");
    checkFee("6.57");
  });

  it("renders the fee with an additional value for every 500m of distance after the inital 1000m", () => {
    submitFormWithValues("10", "1499", "4", "21.01.2024 13:50");
    checkFee("3");
    clearForm();

    submitFormWithValues("10", "1500", "4", "21.01.2024 13:50");
    checkFee("3");
    clearForm();

    submitFormWithValues("10", "1501", "4", "21.01.2024 13:50");
    checkFee("4");
    clearForm();

    submitFormWithValues("10", "2000", "4", "21.01.2024 13:50");
    checkFee("4");
    clearForm();

    submitFormWithValues("10", "2500", "4", "21.01.2024 13:50");
    checkFee("5");
  });

  it("renders the fee with a surcharge for every item above and including the fifth one", () => {
    submitFormWithValues("10", "1000", "4", "21.01.2024 13:50");
    checkFee("2");
    clearForm();

    submitFormWithValues("10", "1000", "5", "21.01.2024 13:50");
    checkFee("2.50");
    clearForm();

    submitFormWithValues("10", "1000", "6", "21.01.2024 13:50");
    checkFee("3");
    clearForm();

    submitFormWithValues("10", "1000", "7", "21.01.2024 13:50");
    checkFee("3.50");
    clearForm();

    submitFormWithValues("10", "1000", "12", "21.01.2024 13:50");
    checkFee("6");
  });

  it('renders the fee with an extra "bulk" fee when the number of items is above 12', () => {
    submitFormWithValues("10", "1000", "12", "21.01.2024 13:50");
    checkFee("6");
    clearForm();

    submitFormWithValues("10", "1000", "13", "21.01.2024 13:50");
    checkFee("7.70");
    clearForm();

    submitFormWithValues("10", "1000", "14", "21.01.2024 13:50");
    checkFee("8.20");
  });

  it('renders the fee with the rush hour if the order time is friday between 3 and 7 PM', () => {
    submitFormWithValues("10", "1000", "12", "26.01.2024 15:00");
    checkFee("7.20");
    clearForm();

    submitFormWithValues("10", "1000", "13", "02.02.2024 16:34");
    checkFee("9.24");
    clearForm();

    submitFormWithValues("10", "1000", "14", "26.01.2024 18:59");
    checkFee("9.84");
    clearForm();

    submitFormWithValues("10", "1000", "14", "26.01.2024 19:00");
    checkFee("8.20");

    submitFormWithValues("10", "1000", "14", "25.01.2024 18:59");
    checkFee("8.20");
  });

  it("renders the fee with a maximum value of 15€", () => {
    submitFormWithValues("10", "10000", "12", "21.01.2024 13:50");
    checkFee("15");
    clearForm();

    submitFormWithValues("1", "10000", "1300", "21.01.2024 13:50");
    checkFee("15");
    clearForm();

    submitFormWithValues("199", "10", "9000", "21.01.2024 13:50");
    checkFee("15");
  });

  it("renders the fee as 0€ when the cart value is 200€ or more", () => {
    submitFormWithValues("200", "10000", "12", "21.01.2024 13:50");
    checkFee("0");
    clearForm();

    submitFormWithValues("201", "10000", "1300", "21.01.2024 13:50");
    checkFee("0");
    clearForm();

    submitFormWithValues("200.01", "10", "9000", "21.01.2024 13:50");
    checkFee("0");
  });


});
