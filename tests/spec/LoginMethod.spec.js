const { test } = require('@playwright/test');
const LoginMethod = require('../page/LoginMethod');

test.describe('Login Tests', () => {

  test('Test case 3: Negative password test', async ({ page }) => {
    const loginPage = new LoginMethod(page);
    await loginPage.runInvalidPasswordTest();
  });
  test('Test case 4: Again Login Test', async ({ page }) => {  
    const loginPage = new LoginMethod(page);
    await loginPage.runInvalidUsernameTest();
  });

});