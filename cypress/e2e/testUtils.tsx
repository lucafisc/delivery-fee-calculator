export const submitFormWithValues = (
  cartValue: string,
  deliveryDistance: string,
  numberOfItems: string,
  orderTime: string
): void => {
  if (cartValue !== '') {
    cy.get('[data-test-id="cartValue"]').type(cartValue)
  }
  if (deliveryDistance !== '') {
    cy.get('[data-test-id="deliveryDistance"]').type(deliveryDistance)
  }
  if (numberOfItems !== '') {
    cy.get('[data-test-id="numberOfItems"]').type(numberOfItems)
  }
  if (orderTime !== '') {
    cy.get('[data-test-id="orderTime"]').type(`${orderTime}{enter}`)
  }

  cy.get('[data-test-id="form"]').submit()
}

export const checkFee = (fee: string): void => {
  const feeText = fee === '--' ? '--' : `${fee}€`
  cy.get('[data-test-id="fee"]').should('exist').should('have.text', feeText)
}

export const clearForm = (): void => {
  cy.get('[data-test-id="cartValue"]').clear()
  cy.get('[data-test-id="deliveryDistance"]').clear()
  cy.get('[data-test-id="numberOfItems"]').clear()
  cy.get('[data-test-id="orderTime"]').clear()
}
