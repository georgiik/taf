class LoginTest {
	beforeEach(testContext) {
		return testContext.page.appStates.atLoginPage()
	}
	afterEach(testContext) {
		return testContext.page.appStates.browserClosed()
	}
	testValidLogin(props) {
		props.tags = ['login', 'valid']
		props.feature = 'Login'
		props.story = 'ValidLogin'

		return async (testContext) => {
			const
				{ page, data } = testContext,
				{ loginPage, homePage } = page,
				{ users } = data

			await loginPage.loginAs(users.valid)
			expect(await homePage.isOpened()).to.be.true
		}
	}
	testInvalidLogin(props) {
		props.tags = ['login', 'invalid']
		props.feature = 'Login'
		props.story = 'InvalidLogin'

		return async (testContext) => {
			const
				{ page, data } = testContext,
				{ loginPage } = page,
				{ users } = data

			await loginPage.loginAs(users.invalid)
			expect(await loginPage.getLoginFormTitle()).to.equal('Incorrect credentials')
		}
	}
}

module.exports = LoginTest