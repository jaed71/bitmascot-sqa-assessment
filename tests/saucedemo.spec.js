const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Flow', () => {

  test('User can log in, add product, verify cart, and log out', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const firstItem = page.locator('.inventory_item').first();
    const expectedProductName = await firstItem.locator('.inventory_item_name').textContent();
    await firstItem.locator('button:text("Add to cart")').click();

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const cartProductName = await page.locator('.inventory_item_name').textContent();
    expect(cartProductName).toBe(expectedProductName);

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
 
  });

});