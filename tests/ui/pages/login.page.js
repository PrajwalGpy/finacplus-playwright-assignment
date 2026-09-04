class LoginPage{
    constructor(page){
        this.page = page

        this.usernameInput = page.getByPlaceholder("UserName")
        this.passwordInput = page.getByPlaceholder("Password")
        this.loginButton = page.getByRole('button',{name:'Login'})
        this.logoutButton = page.getByRole('Button',{name:'Logout'})
    }

    async goto(){
        await this.page.goto('/login')
    }

    async login(username,password){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}