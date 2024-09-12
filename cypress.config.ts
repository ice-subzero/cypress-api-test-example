import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import * as fs from "fs";
import * as path from "path";

const { generate } = require("multiple-cucumber-html-reporter");

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(config, {
      typescript: require.resolve("typescript"),
    })
  );

  // Custom event after all tests are completed
  // Generate Cucumber JSON report
  on("after:run", () => {
    const jsonReportDir = "cucumber-reports";
    const jsonReport = `${jsonReportDir}/cucumber-report.json`;

    if (fs.existsSync(jsonReportDir)) {
      fs.rmdirSync(jsonReportDir, { recursive: true });
    }
    fs.mkdirSync(jsonReportDir);

    // Use multiple-cucumber-html-reporter to generate HTML report
    require("multiple-cucumber-html-reporter").generate({
      jsonDir: jsonReportDir,
      reportPath: "cucumber-html-report",
    });
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: "https://sandbox.moodledemo.net/login/index.php",
    specPattern: "**/*.{feature,spec.cy.ts}",
    setupNodeEvents,
  },
});
