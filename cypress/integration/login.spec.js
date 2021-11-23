/// <reference types="cypress" />

describe('Login', () => {

    beforeEach(() => {
        cy.visit('login')
    });

    it('Login com credenciais validas', {tags: ['positivo', 'critico']}, () => {
        cy.get('input[type=email]').type('cypress@mail.com')
        cy.get('input[type=password]').type('cypress123')
        cy.contains('button', 'Sign in').click()
        cy.get('[href*=editor]').should('be.visible')
    });

    it('Login com credenciais invalidas', {tags:['negativo', 'baixa']}, () => {
        cy.get('input[type=email]').type('cypress@mail.com')
        cy.get('input[type=password]').type('cypress')
        cy.contains('button', 'Sign in').click()
        cy.get('li[ng-repeat$=errors]').should('be.visible').and('contains.text', 'email or password is invalid')
    });
});