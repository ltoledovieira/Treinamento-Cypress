/// <reference types="cypress" />

var Chance = require('chance');
var chance = new Chance();

describe('Artigos', () => {
  beforeEach(() => {
    cy.login()

    cy.visit('/')
    
  });

  it('Incluir artigo', {tags:'positivo'}, () => {

    cy.get('[href*=editor]').click()

    const articleTitle = 'Exemplo artigo ' + new Date().getTime()

    cy.get('input[ng-model$=title]').type(articleTitle)
    cy.get('input[ng-model$=description]').type(chance.sentence({ words: 4 }))
    cy.get('textarea[ng-model$=body]').type(chance.paragraph({ sentences: 1 }))
    cy.get('input[ng-model$=tagField]').type('Cypress')

    cy.contains('button', 'Publish Article').click()

    cy.get('h1').should('contain', articleTitle)


  });

});