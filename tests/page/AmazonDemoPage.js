const { expect } = require('@playwright/test');
const { amazonDemoLocators } = require('../locator/amazonDemo.locator');

class AmazonDemoPage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    console.log(`[AmazonDemoPage] Opening URL: ${url}`);
    await this.page.goto(url);
  }

  async amazonDemo(searchQuery) {
    console.log(`[AmazonDemoPage] Performing search with query: ${searchQuery}`);
    await this.page.locator(amazonDemoLocators.searchInput).fill(searchQuery);
    await this.page.locator(amazonDemoLocators.searchButton).click();
  }

  async expectAmazonDemoSuccess() {
    console.log('[AmazonDemoPage] Verifying search results are visible');
    await expect(this.page.locator(amazonDemoLocators.compareSearchResult).first()).toBeVisible();
  }

  async selectFourthFromList() {
    console.log('[AmazonDemoPage] Selecting fourth from list');
    await this.page.locator(amazonDemoLocators.fourthFromList).click();
  }

  async goToCart() {
    console.log('[AmazonDemoPage] Going to cart');
    await this.page.locator(amazonDemoLocators.goToCart).click();
  }

  async deleteFromCart() {
    console.log('[AmazonDemoPage] Deleting from cart');
    await this.page.locator(amazonDemoLocators.deleteFromCart).click();
  }

}

module.exports = { AmazonDemoPage };
