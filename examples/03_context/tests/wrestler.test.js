class WrestlerTest {
	async beforeEach(testContext) {
		const { page, data } = testContext
		await page.appStates.atLoginPage()
		return page.loginPage.loginAs(data.users.valid)
	}
	afterEach(testContext) {
		return testContext.page.appStates.browserClosed()
	}
	testCreateWrestler(props) {
		props.tags = ['wrestler', 'create']
		props.feature = 'Wrestler'

		return async (testContext) => {
			const
				{ page, data } = testContext,
				{ homePage, wrestlerPage } = page,
				{ wrestlerCreate } = data.wrestlers

			await homePage.newWrestler()
			await wrestlerPage.enterWrestler(wrestlerCreate)
			await wrestlerPage.save()

		}
	}
	testReadWrestler(props) {
		props.tags = ['wrestler', 'read']
		props.feature = 'Wrestler'

		return async (testContext) => {
			const
				{ page, data } = testContext,
				{ homePage, wrestlerPage } = page,
				{ wrestlerRead } = data.wrestlers

				await homePage.search('LastName')
				await homePage.openFirst()
			}
	}
	testDeleteWrestler(props) {
		props.tags = ['wrestler', 'delete']
		props.feature = 'Wrestler'

		return async (testContext) => {
			const
				{ page, data } = testContext,
				{ homePage, wrestlerPage } = page,
				{ wrestlerDelete } = data.wrestlers

			await homePage.openFirst()
			const lastName = await wrestlerPage.getLastName()
			await wrestlerPage.deleteWrestler()
			await homePage.search(lastName)

			const count = await homePage.searchResultsCount()
		}
	}
}

module.exports = WrestlerTest