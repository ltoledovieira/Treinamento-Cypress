/// <reference types="cypress" />

describe('Cadastro', () => {

    beforeEach(() => {
      cy.visit('register');
    });
  
    it('Cadastro de usuario com credenciais validas', {tags:['positivo', 'critico']},() => {
  
      cy.intercept({
        method: 'POST',
        pathname: '/api/users'
      }, {
        statusCode: 200,
        fixture: 'cadastro-sucesso'
      }).as('postUsers')
  
      cy.get('[ng-model$=username]').type('Laura Vieira')
      cy.get('[ng-model$=email]').type('cypress@mail.com')
      cy.get('[ng-model$=password]').type('cypress123')
      cy.contains('button', 'Sign up').click()
  
      cy.wait('@postUsers')
      
      
    });
  
    it('Cadastro de usuário com credenciais invalidas', {tags:['negativo', 'critico']}, () => {

      cy.intercept({
        method: 'POST',
        pathname: '/api/users'
      }, {
        statusCode: 422,
        fixture: 'cadastro-invalido'
      }).as('postUsers')
  
      cy.get('[ng-model$=username]').type('Laura Vieira')
      cy.get('[ng-model$=email]').type('cypress@mail.com')
      cy.get('[ng-model$=password]').type('cypress123')
  
      cy.contains('button', 'Sign up').click()
  
      cy.get('.error-messages').should('contain', 'email has already been taken')
  
    });
  
  });