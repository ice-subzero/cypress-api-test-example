// import { report } from "multiple-cucumber-html-reporter";
const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "cypress/cucumber-json", // ** Path of .json file **
  reportPath: "./reports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "N/A",
    },
    device: "Test machine",
    platform: {
      name: "xxxxxxxx",
      version: "N/A",
    },
  },
});
