const { test } = require('@playwright/test');
const { AmazonDemoPage } = require('../page/AmazonDemoPage');
const amazonDemoData = require('../data/amazonDemoData.json');
const ACTION_DELAY_MS = 4000;

test('test case 1: search for a product', async ({ page }) => {
  const amazonDemoPage = new AmazonDemoPage(page);
  await amazonDemoPage.open(amazonDemoData.baseUrl);
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.amazonDemo(amazonDemoData.searchQuery);
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.expectAmazonDemoSuccess();
});

test('test case 2: select fourth from list', async ({ page }) => {
  const amazonDemoPage = new AmazonDemoPage(page);
  await amazonDemoPage.open(amazonDemoData.baseUrl);
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.amazonDemo(amazonDemoData.searchQuery);
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.selectFourthFromList();
});

test('test case 3: delete from cart', async ({ page }) => {
  const amazonDemoPage = new AmazonDemoPage(page);
  await amazonDemoPage.open(amazonDemoData.baseUrl);
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.amazonDemo(amazonDemoData.searchQuery);
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.selectFourthFromList();
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.goToCart();
  await page.waitForTimeout(ACTION_DELAY_MS);
  await amazonDemoPage.deleteFromCart();
});

 