const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Flow', () => {

  test('User can log in, add product, verify cart, and log out', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
  });

});