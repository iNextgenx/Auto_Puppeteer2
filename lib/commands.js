module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  // Функция выбора места
  selectSeat: async function (page, row, seat) {
    try {
      const selectorSeat =
        (page,
        "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
          row +
          ") > span:nth-child(" +
          seat +
          ")");
      await page.waitForSelector(selectorSeat);
      await page.click(selectorSeat);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selectorSeat}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
};
