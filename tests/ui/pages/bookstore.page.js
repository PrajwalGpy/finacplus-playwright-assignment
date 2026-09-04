class BookStorePage {
  constructor(page) {
    this.page = page;

    this.bookStoreButton = page.getByRole("link", { name: "Book Store" });
    this.searchBox = page.getByPlaceholder("Type to search");
    this.bookRows = page.locator("tr").filter({
      has: bookName,
    });
  }
  async openBookStore(){
    await this.bookStoreButton.click();
  }
}
