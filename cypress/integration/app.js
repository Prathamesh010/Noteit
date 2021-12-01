describe('Check if the website loads', () => {
	it('inital load', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Note it !')
	})
})

describe('add a note', () => {
	it('add a note', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Note it !')
		cy.get('.MuiButton-root').click()
		cy.get('.css-k008qs > .MuiTypography-root').click()
		cy.get('.MuiInput-input').type('Test Note')
		cy.get('.w-md-editor-text-input').type('# Test Note')
		cy.get('.css-k008qs > .MuiButton-root').click()
		cy.get('.MuiSnackbar-root > .MuiPaper-root').contains('Note created')
	})
})

describe('update a note', () => {
	it('update a note', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Note it !')
		// create a note
		cy.get('.MuiButton-root').click()
		cy.get('.css-k008qs > .MuiTypography-root').click()
		cy.get('.MuiInput-input').type('Test Note')
		cy.get('.w-md-editor-text-input').type('# Test Note')
		cy.get('.css-k008qs > .MuiButton-root').click()
		cy.get('.MuiSnackbar-root > .MuiPaper-root').contains('Note created')
		// update the note
		cy.get('.MuiGrid-root > .MuiPaper-root').click()
		cy.get('.css-k008qs > :nth-child(3)').click()
		cy.get('.w-md-editor-text-input').type('# Test Note Updated')
		cy.get('.css-k008qs > .MuiButton-root').click()
		cy.get('.MuiSnackbar-root > .MuiPaper-root').contains('Note updated')
		cy.get('.MuiGrid-root > .MuiPaper-root').click()
		cy.get('.MuiDialogContent-root').contains('Test Note Updated')
	})
})

describe('delete a note', () => {
	it('delete a note', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Note it !')
		// create a note
		cy.get('.MuiButton-root').click()
		cy.get('.css-k008qs > .MuiTypography-root').click()
		cy.get('.MuiInput-input').type('Test Note')
		cy.get('.w-md-editor-text-input').type('# Test Note')
		cy.get('.css-k008qs > .MuiButton-root').click()
		cy.get('.MuiSnackbar-root > .MuiPaper-root').contains('Note created')
		// delete the note
		cy.get('.MuiGrid-root > .MuiPaper-root').click()
		cy.get('.css-k008qs > :nth-child(4)').click()
		cy.get('.MuiSnackbar-root > .MuiPaper-root').contains('Note deleted')
	})
})

describe('change theme', () => {
	it('change theme', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Note it !')
		cy.get('.MuiSwitch-input')
			.click()
			.should(() => {
				expect(localStorage.getItem('theme')).to.equal('dark')
			})
		cy.get('body').should('have.css', 'background-color', 'rgb(32, 33, 36)') // #202124
	})
})
