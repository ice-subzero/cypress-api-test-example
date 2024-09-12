/// <reference types='cypress' />
// Above line needed as indicator for Cypress
// Step definition: Mapping feature to commands.
// You can call Cypress default commands or custom commands here.
// Please

// 1.Do not access variable directly (except timeout, baseUrl)
// 2.Do not access locator directly
// 3.When you use @badeball/cypress-cucumber-preprocessor You don't need the An keyword in step definitions. You can define to other keyword
// Import Cucumber prefix
// import { Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// Import additional layer for reusing command
// import LoginCommands from '../../../support/loginCommands'; import HomeCommands from '../../../support/homeCommands';

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test return false
});

Given("user open browser and go to login page", () => {
  let url = Cypress.config().baseUrl;
  cy.visit(url);
});

When("user input username with {string}", (username: string) => {
  cy.get("#username").type(username);
  //   LoginCommands.inputUsername(username);
});

When("user input password with {string}", (password: string) => {
  cy.get("#password").type(password);

  //   LoginCommands.inputPassword(password);
});

When("user click login button", () => {
  cy.get("#password").click();
  //   LoginCommands.clickLoginButton(username);
});

// Then("system redirect to home page", () => {
//   HomeCommands.verifyCurrentLocationIsHomePage();
// });
