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
Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url:`${Cypress.env('apiUrl')}/users/login`,
        body:{"user":{
            "email": "cypress@mail.com",
            "password": "cypress123"
        }} 
    }).then(response => {
        cy.log(response.body.user.token)

        const token = response.body.user.token

        window.localStorage.setItem('jwtToken', token)
    })
})

Cypress.Commands.add('artigo', () => {
    cy.get('[href*=editor]').click()

    const articleTitle = 'Exemplo artigo ' + new Date().getTime()

    cy.get('input[ng-model$=title]').type(articleTitle)
    cy.get('input[ng-model$=description]').type(chance.sentence({ words: 4 }))
    cy.get('textarea[ng-model$=body]').type(chance.paragraph({ sentences: 1 }))
    cy.get('input[ng-model$=tagField]').type('Cypress')
    cy.contains('button', 'Publish Article').click()
    cy.get('h1').should('contain', articleTitle)
})