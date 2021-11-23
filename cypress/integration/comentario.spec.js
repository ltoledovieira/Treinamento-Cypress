/// <reference types="cypress" />

var Chance = require('chance');
var chance = new Chance();

describe('Incluir comentario', () => {

    beforeEach(() => {
        cy.login()

        cy.visit('/')

        cy.artigo()

    });

    it('Incluir comentario em artigo', {tags:'positivo'}, () => {

        const comment = 'Comentario' + new Date().getTime()

        //Comentario
        cy.get('textarea[placeholder]').type(comment)
        cy.contains('button', 'Post Comment').click()
        cy.get('p[ng-bind]').should('contain', comment)

    });

    it('Excluir comentario', {tags:'positivo'}, () => {

        const comment = 'Comentario' + new Date().getTime()

        //Comentario
        cy.get('textarea[placeholder]').type(comment)
        cy.contains('button', 'Post Comment').click()
        cy.get('p[ng-bind]').should('contain', comment)

        //Excluir
        cy.get('.mod-options > .ion-trash-a').click()
        cy.get('p[ng-bind]').not('.visible')
    });
});