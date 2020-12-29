describe('Login', () => {
  it('logs into the app', () => {
    cy.visit('/')

    cy.get('input[name="email"]').type('testuser@app.com')
    cy.get('input[name="password"]').type('Doe1234#{enter}')

    cy.get('h1').should('contain', 'My Plants')
  })
  it('shows the error modal due to invalid login data', () => {
    cy.visit('/')

    cy.get('input[name="email"]').type('testuser@app.com')
    cy.get('input[name="password"]').type('Doe1234{enter}')

    cy.get('p').should('contain', 'Email or Password wrong!')
  })
})
