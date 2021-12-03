// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('addNote', (originalFn, url, options) => { 
    cy.get('.MuiButton-root').click()
	cy.get('.css-k008qs > .MuiTypography-root').click()
	cy.get('.MuiInput-input').type('Test Note')
	cy.get('.w-md-editor-text-input').type('# Test Note')
	cy.get('.css-k008qs > .MuiButton-root').click()
	cy.get('.MuiSnackbar-root > .MuiPaper-root').contains('Note created')
})