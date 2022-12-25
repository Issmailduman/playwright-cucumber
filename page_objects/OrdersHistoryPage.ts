import { Locator, Page, expect } from "@playwright/test";
import { PlaceOrderPage } from "./PlaceOrderPage";

export class OrdersHistoryPage {
  orderTable: Locator;
  rows: Locator;
  idDetails: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.orderTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.idDetails = page.locator(".col-text");
  }

  async selectOrderId(orderId: string) {
    await this.orderTable.waitFor();

    const count = await this.rows.count();
    for (let i = 0; i < count; i++) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId!.includes(rowOrderId!)) {
        await this.rows.nth(i).locator("td button").first().click();
        break;
      }
    }
  }

  async getOrderDetailsId() {
    return await this.idDetails.textContent();
  }
  async writeOrderId() {
    console.log(await this.idDetails.textContent());
  }
}