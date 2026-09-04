import { LoginPage } from "./pages/login.page";
import { BookStorePage } from "./pages/bookstore.page";
import { test, expect } from "@playwright/test";


const USERNAME = "prajwalgp11"
const PASSWORD = "Password@11"

test('Login test',async({page})=>{
    const loginPage = new LoginPage(page);
    const bookStorePage = new BookStorePage(page)

    await loginPage.goto()

    await loginPage.login(USERNAME,PASSWORD)

    await expect(page.getByText(USERNAME)).toBeVisible()

    await expect(loginPage.logoutButton).toBeVisible()

    await bookStorePage.openBookStore()

    await expect(page).toHaveURL(/books/)

    const bookName = 'Learning JavaScript Design Patterns';
    await bookStorePage.searchBook(bookName)

    const bookLink = page.getByRole("link", {
    name: "Learning JavaScript Design Patterns",
    exact: true,
  });

  await expect(bookLink).toBeVisible();


    const bookDetails = await bookStorePage.getBookDetails()

    console.log('Book Details:');
    console.log(`Title: ${bookDetails.title}`);
    console.log(`Author: ${bookDetails.author}`);
    console.log(`Publisher: ${bookDetails.publisher}`);


})

