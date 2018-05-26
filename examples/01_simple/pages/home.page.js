const BasePage = require('./base.page')

const elementDisplayed = async (el) => await el.isDisplayed()

class HomePage extends BasePage {
	constructor(driver) {
		super(driver)
		this.searchBox = this.$('[ng-model="searchFor"]').waitForElement(5000)
		this.addBtn = this.$('[ng-click="newWrestler()"]').waitForElement(5000)
		this.firstWrestler = this.$('[ng-click="openWrestler(wrestler)"]').waitForElement(5000)
		this.wrestlers = this.$$('[ng-click="openWrestler(wrestler)"]')
		this.submitBtn = this.$('[ng-click="searchWrestler(searchFor)"]')
	}
	isOpened() {
		return this.searchBox.isDisplayed()
	}
	async search(q) {
		await this.client.sleep(500)
		await this.searchBox.sendKeys(q)
		return this.submitBtn.click()
	}
	newWrestler() {
		return this.addBtn.click()
	}
	openFirst() {
		return this.firstWrestler.click()
	}
	async searchResultsCount() {
		let count = 0
		try {
			count = await this.wrestlers.count()
		} catch (e) {

		}
		return count
	}
}

module.exports = HomePage