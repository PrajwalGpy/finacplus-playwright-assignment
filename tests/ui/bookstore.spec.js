import { LoginPage } from "./pages/login.page";
import { test, expect } from "@playwright/test";


const USERNAME = "prajwalgp11"
const PASSWORD = "Password@11"

test('Login test',async({page})=>{
    const loginPage = new LoginPage(page);

    await loginPage.goto()

    await loginPage.login(USERNAME,PASSWORD)

    await expect(page.getByText(USERNAME)).toBeVisible()

    await expect(loginPage.logoutButton).toBeVisible()
})

