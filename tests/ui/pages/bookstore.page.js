import { title } from "node:process";

export class BookStorePage {
  bookName = "Learning JavaScript Design Patterns";

  constructor(page) {
    this.page = page;

    this.bookStoreButton = page.getByRole("link", {
      name: "Book Store",
      exact: true,
    });
    this.searchBox = page.getByPlaceholder("Type to search");
  }
  async openBookStore() {
    await this.bookStoreButton.click();
  }

  async searchBook(bookName) {
    await this.searchBox.fill(bookName);
  }

  getBookRow(bookName) {
    return this.page.locator("tr").filter({ hasText: bookName });
  }
  async getBookDetails(bookName) {
    const row = this.getBookRow(bookName);
    return {
      title: await row.locator("td").nth(1).textContent(),
      author: await row.locator("td").nth(2).textContent(),
      publisher: await row.locator("td").nth(3).textContent(),
    };
  }
}
