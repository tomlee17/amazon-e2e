import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/home-page';
import { SearchResultsPage } from '../pages/search-results-page';
import { serialize } from 'v8';
import { ProductPage } from '../pages/product-page';
import { postAddCartPage } from '../pages/post-add-cart-page';
import exp from 'constants';

test('Search, filter, add product to cart, then remove from cart', async ({ page }) => {
  const PRODUCT = 'toilet paper';
  const BRAND = 'Scottie';
  const QTY = 2;

  // Navigate to main page
  const main_page = new MainPage(page);
  await main_page.goToUrl();
  await expect(page).toHaveURL(main_page.target_url);

  // Search for a product and filter by brand
  await main_page.search(PRODUCT);
  const search_results_page = new SearchResultsPage(page);
  await search_results_page.filterByBrand(BRAND);

  const filtered_products_counts = await search_results_page.filtered_products_links.count();
  const assertions: Promise<void>[] = [];
  for (let i = 0; i < filtered_products_counts; ++i) {
    assertions.push(
      expect(search_results_page.filtered_products_links.nth(i)).toHaveText(BRAND)
    );
  }
  await Promise.all(assertions);

  // Click on a product
  await search_results_page.selectFirstProductOf(BRAND);
  const product_page = new ProductPage(page);
  await expect(product_page.product_title).toContainText(BRAND);

  // Add a number of the product to cart
  await product_page.addToCart(QTY);
  const post_add_cart_page = new postAddCartPage(page);
  await Promise.all([
    expect(post_add_cart_page.added_to_cart_heading).toBeVisible(),
    expect(post_add_cart_page.header.cart_count).toHaveText(`${QTY}`)
  ]);

  // Remove from cart
  await post_add_cart_page.removeProduct();
  await expect(post_add_cart_page.header.cart_count).toHaveText('0');
});
