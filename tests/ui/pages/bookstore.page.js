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
    this.bookRows = page.locator("tr").filter({
      hasText: this.bookName,
    });
  }
  async openBookStore() {
    await this.bookStoreButton.click();
  }

  async searchBook(bookName) {
    await this.searchBox.fill(bookName);
  }

  async getBookDetails() {
    return {
      title: await this.bookRows.locator("td").nth(1).textContent(),
      author: await this.bookRows.locator("td").nth(2).textContent(),
      publisher: await this.bookRows.locator("td").nth(3).textContent(),
    };
  }
}
