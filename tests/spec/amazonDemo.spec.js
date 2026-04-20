const { test } = require('@playwright/test');
const { AmazonDemoPage } = require('../page/AmazonDemoPage');
const amazonDemoData = require('../data/amazonDemoData.json');

test('test case 1: search for a product', async ({ page }) => {
  const amazonDemoPage = new AmazonDemoPage(page);
  await amazonDemoPage.testCase1();
});

test('test case 2: select fourth from list', async ({ page }) => {
  const amazonDemoPage = new AmazonDemoPage(page);
  await amazonDemoPage.testCase2();
});

test('test case 3: delete from cart', async ({ page }) => {
  const amazonDemoPage = new AmazonDemoPage(page);
  await amazonDemoPage.testCase3();
});

 