const { expect } = require("chai");
const {
  clickElement,
  putText,
  getText,
  selectSeat,
} = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Cinema tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Positive test 1", async () => {
    await clickElement(page, "body > nav > a:nth-child(4)");
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div:nth-child(3) > ul > li > a"
    );
    await selectSeat(page, 10, 9);
    await selectSeat(page, 10, 10);
    await clickElement(page, "body > main > section > button");
    const actual = await getText(page, "body > main > section > div > button");
    expect(actual).contain("Получить код бронирования");
  });

  test("Positive test 2", async () => {
    await clickElement(page, "body > nav > a:nth-child(7)");
    await clickElement(
      page,
      "body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a"
    );
    await selectSeat(page, 10, 1);
    await selectSeat(page, 6, 6);
    await selectSeat(page, 6, 7);
    await clickElement(page, "body > main > section > button");
    const actual = await getText(page, "body > main > section > div > button");
    expect(actual).contain("Получить код бронирования");
  });

  test("Negative test", async () => {
    await clickElement(page, "body > nav > a:nth-child(2)");
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div:nth-child(3) > ul > li > a"
    );
    await selectSeat(page, 10, 17);
    await selectSeat(page, 10, 18);
    await clickElement(page, "body > main > section > button");
    await clickElement(page, "body > main > section > div > button");
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "body > nav > a:nth-child(2)");
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div:nth-child(3) > ul > li > a"
    );
    await selectSeat(page, 10, 17);
    await selectSeat(page, 10, 18);
    const element = await page.$("body > main > section > button");
    const actual = await page.evaluate(
      (element) => element.getAttribute("disabled"),
      element
    );
    expect(actual).contain("true");
  });
});
