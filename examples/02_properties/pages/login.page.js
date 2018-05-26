const BasePage = require('./base.page')

class LoginPage extends BasePage {
	constructor(driver) {
		super(driver)
		this.username = this.$('[value="user.username"] input').waitForElement(5000)
		this.password = this.$('[value="user.password"] input')
		this.loginBtn = this.$('button')
		this.title = this.$('.panel-heading')
	}
	async enterUsername(username) {
		return this.username.sendKeys(username)
	}
	async enterPassword(password) {
		return this.password.sendKeys(password)
	}
	async submitLogin() {
		await this.client.sleep(500)
		return this.loginBtn.click()
	}
	async loginAs({ username, password }) {
		await this.enterUsername(username)
		await this.enterPassword(password)
		return this.submitLogin()
	}
	async getLoginFormTitle() {
		await this.client.sleep(500)
		return this.title.getText()
	}
}

module.exports = LoginPage