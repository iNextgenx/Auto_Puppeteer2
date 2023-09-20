const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {
  putText,
  getText,
  clickElement,
  selectSeat,
} = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("User is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 80000,
  });
});

When(
  "User click element {string}",
  { timeout: 80000 },
  async function (selector) {
    return await clickElement(this.page, selector);
  }
);

When(
  "User choose days after today to go {string}",
  { timeout: 80000 },
  async function (days) {
    return await clickElement(
      this.page,
      "body > nav > a:nth-child(" + String(Number(days) + 1) + ")"
    );
  }
);

When(
  "User choose film 1 to 3 {string} and time 1 or 2 {string}",
  { timeout: 80000 },
  async function (film, time) {
    return await clickElement(
      this.page,
      "body > main > section:nth-child(" +
        film +
        ") > div:nth-child(" +
        String(Number(time) + 1) +
        ") > ul > li > a"
    );
  }
);

When(
  "User choose row {string} and seat {string}",
  { timeout: 80000 },
  async function (row, seat) {
    return await selectSeat(this.page, row, seat);
  }
);

When("User click book button", { timeout: 80000 }, async function () {
  return await clickElement(this.page, "body > main > section > button");
});

When("User click get QR code button", { timeout: 80000 }, async function () {
  return await clickElement(this.page, "body > main > section > div > button");
});

When("User go to {string} page", { timeout: 80000 }, async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`);
});

Then("User sees get QR code button", { timeout: 80000 }, async function () {
  const actual = await getText(
    this.page,
    "body > main > section > div > button"
  );
  expect(actual).contain("Получить код бронирования");
});

Then("User sees disabled book button", { timeout: 80000 }, async function () {
  const element = await this.page.$("body > main > section > button");
  const actual = await this.page.evaluate(
    (element) => element.getAttribute("disabled"),
    element
  );
  expect(actual).contain("true");
});
