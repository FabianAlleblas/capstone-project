describe('Login', () => {
  it('logs into the app', () => {
    cy.visit('/')

    cy.get('input[name="email"]').type('admin@admin.com')
    cy.get('input[name="password"]').type('admin{enter}')

    cy.get('h1').should('contain', 'My Plants')
  })
  it('shows the error modal due to invalid login data', () => {
    cy.visit('/')

    cy.get('input[name="email"]').type('armin@admin.com')
    cy.get('input[name="password"]').type('armin{enter}')

    cy.get('p').should('contain', 'Email or Password wrong!')
  })
})
