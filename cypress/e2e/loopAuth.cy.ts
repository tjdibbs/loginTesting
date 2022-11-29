/// <reference types="cypress" />

type USER = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
};

describe("Multiple Authentication", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/demo.html");
  });

  const clear = () => cy.get("input").clear();
  const check = () =>
    cy.get("#firstName,#lastName,#username,#password").each((element) => {
      cy.wrap(Cypress.$(element).val()).should("be.empty");
    });

  //  This doesn't prefix the email
  it("It signed in successfully - Prefixed with testing+", () => {
    cy.readFile("cypress/fixtures/users.json").then((users: USER[]) => {
      cy.wrap(users).each((user: USER, index) => {
        cy.get("#firstName").type(user.firstname);
        cy.get("#lastName").type(user.lastname);
        cy.get("#username").type(`testing${user.email}@gmail.com`);
        cy.get("#password").type(user.password);

        // When the block is clicked it clears the input boxes
        cy.get(".block").click();

        check();

        // wait if the click action is performing an asynchronous action
        // cy.wait(5000)
      });
    });
  });

  it("It signed in successfully With a Prefixed Email with hbi.testingacc1+", () => {
    cy.readFile("cypress/fixtures/users.json").then((users: USER[]) => {
      cy.wrap(users).each((user: USER, index) => {
        cy.get("#firstName").type(user.firstname);
        cy.get("#lastName").type(user.lastname);

        // This is the part that differentiate the first from this.
        cy.get("#username").type(`hbi.testingacc1+${user.email}@gmail.com`);
        cy.get("#password").type(user.password);

        // When the block is clicked it clears the input boxes
        cy.get(".block").click();

        check();

        // wait if the click action is performing an asynchronous action
        // cy.wait(5000)
      });
    });
  });
});
