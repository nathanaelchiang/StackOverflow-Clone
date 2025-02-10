## Getting started

- Install [Node](https://nodejs.org/en/download/package-manager)
- Install all project dependencies by running the command below from the project root:
    `$ npm install`
- Check if necessary dependencies installed:
    `$ npm ls`

- Depdencies needed:
    - Cypress
    - Typescript
    - React
    - ESLint

## Start the Application

Run the following command to start the application:

`$ npm start`

Open the URL __http://localhost:3000/__ in a browser to see the application.

## Run the tests:

Make sure application is running before running the tests.

From the browser: run the following command and select e2e testing.

`$ npx cypress open`

From the command line:

`$ npx cypress run`

## Run ESLint Style Checker

The project is configured to check for style violations. Run the command below to check if you are violating any style rules.

`$ npx eslint src/`

You must fix all style errors and warnings reported by the linter. You will get no credit for the style section in the rubric if you fail to do so.

The list of rules and a brief description of each rule that the linter checks is give [here](https://typescript-eslint.io/rules).