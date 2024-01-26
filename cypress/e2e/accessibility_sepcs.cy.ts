import 'cypress-axe';

describe("Sign Up Accessibility test suite", () => {
    before(() => {
      cy.visit("http://localhost:5173/");
      cy.injectAxe();
    });
  
    it("Check entire page for a11y issues", () => {
      cy.checkA11y();
    });
  });