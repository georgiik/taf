const expect = require('chai').expect
const Driver = require('../driver')
const AppStates = require('../pages/app.states')
const LoginPage = require('../pages/login.page')
const HomePage = require('../pages/home.page')
const Users = require('../data/users.data')

class LoginTest {
	beforeEach() {
		const driver = new Driver()
		this.appStates = new AppStates(driver)
		this.loginPage = new LoginPage(driver)
		this.homePage = new HomePage(driver)
		this.users = new Users()
		return this.appStates.atLoginPage()
	}
	afterEach() {
		return this.appStates.browserClosed()
	}
	testValidLogin() {
		return async () => {
			await this.loginPage.loginAs(this.users.valid)
			expect(await this.homePage.isOpened()).to.be.true
		}
	}
	testInvalidLogin() {
		return async () => {
			await this.loginPage.loginAs(this.users.invalid)
			expect(await this.loginPage.getLoginFormTitle()).to.equal('Incorrect credentials')
		}
	}
}

module.exports = LoginTest