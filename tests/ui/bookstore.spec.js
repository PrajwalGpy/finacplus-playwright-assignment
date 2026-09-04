import { LoginPage } from "../../pages/login.page";
import { BookStorePage } from "../../pages/bookstore.page";
import { test, expect } from "@playwright/test";

const fs = require("fs");
const path = require("path");


test("Login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const bookStorePage = new BookStorePage(page);

   // function for Save  book details
  function writeOutput(fileName, content) {
    const outPath = path.join(__dirname, "../../output", fileName);
    fs.writeFileSync(outPath, content, "utf8");
    return outPath
  }

  // Navigate
  await loginPage.goto();

  await loginPage.login(process.env.USERNAME,process.env.PASSWORD);

  // Validate username
  await expect(page.getByText(process.env.USERNAME)).toBeVisible();
    
  // Validate logout button
  await expect(loginPage.logoutButton).toBeVisible();


  //Book Store
  await bookStorePage.openBookStore();

  await expect(page).toHaveURL(/books/);

  // Search for book
  const bookName = "Learning JavaScript Design Patterns";
  await bookStorePage.searchBook(bookName);

  const bookLink = page.getByRole("link", {
    name: bookName,
    exact: true,
  });

   // Validate search result
  await expect(bookLink).toBeVisible();

  // Get book details
  const bookDetails = await bookStorePage.getBookDetails();

  console.log("Book Details:");
  console.log(`Title: ${bookDetails.title}`);
  console.log(`Author: ${bookDetails.author}`);
  console.log(`Publisher: ${bookDetails.publisher}`);

   // Save details into file
  const output = `
Title: ${bookDetails.title}
Author: ${bookDetails.author}
Publisher: ${bookDetails.publisher}
`;
  const outputFile = writeOutput("book-details.txt", output);

   //Logout
  await loginPage.logout()

  await expect(page).toHaveURL(/login/)

  console.log(`Book details saved to: ${outputFile}`);
});
