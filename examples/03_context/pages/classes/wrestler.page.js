const BasePage = require('./base.page')

const elementHidden = async (el) => await el.getAttribute('class').includes('ng-hide')
const elementDisplayed = async (el) => !(await el.getAttribute('class').includes('ng-hide'))

class WrestlerPage extends BasePage {
	constructor({ driver }) {
		super(driver)
		this.lastName = this.$('[value="wr.lname"] input').waitForElement(5000)
		this.firstName = this.$('[value="wr.fname"] input')
		this.middleName = this.$('[value="wr.mname"] input')
		this.dob = this.$('[value="wr.dob"] input')
		this.region1 = this.$('[value="wr.region1"] select')
		this.fst1 = this.$('[value="wr.fst1"] select')
		this.style = this.$('[value="wr.style"] select')
		this.age = this.$('[value="wr.lictype"] select')
		this.year = this.$('[value="wr.expires"] select')
		this.saveBtn = this.$('[ng-click="save(); fWrestler.$setPristine()"]')
		this.currentTab = this.$('li[active="tab.active"].active')
		this.spinner = this.currentTab.element('.spinner-loader')
		this.closeBtn = this.currentTab.element('ico').waitForElement(5000)
		this.deleteBtn = this.$('[ng-click="delete()"]').waitForElement(5000)
		this.confirmBtn = this.$('[ng-click="ok()"]').waitForElement(5000)
	}
	enterLastName(lastName) {
		return this.lastName.sendKeys(lastName)
	}
	getLastName() {
		return this.lastName.getAttribute('value')
	}
	enterFirstName(firstName) {
		return this.firstName.sendKeys(firstName)
	}
	enterMiddleName(middleName) {
		return this.middleName.sendKeys(middleName)
	}
	enterDOB(dob) {
		return this.dob.sendKeys(dob)
	}
	async selectRegion1(region1) {
		await this.region1.click()
		return this.region1.sendKeys(region1, this.client.Keys.ENTER)
	}
	async selectFst1(fst1) {
		await this.fst1.click()
		return this.fst1.sendKeys(fst1, this.client.Keys.ENTER)
	}
	async selectStyle(style) {
		await this.style.click()
		return this.style.sendKeys(style, this.client.Keys.ENTER)
	}
	async selectAge(age) {
		await this.age.click()
		return this.age.sendKeys(age, this.client.Keys.ENTER)
	}
	async selectYear(year) {
		await this.year.click()
		return this.year.sendKeys(year, this.client.Keys.ENTER)
	}
	async enterWrestler(wrestler) {
		await this.enterLastName(wrestler.lastName)
		await this.enterFirstName(wrestler.firstName)
		await this.enterMiddleName(wrestler.middleName)
		await this.enterDOB(wrestler.dob)
		await this.selectRegion1(wrestler.region1)
		await this.selectFst1(wrestler.fst1)
		await this.selectStyle(wrestler.style)
		await this.selectAge(wrestler.age)
		return this.selectYear(wrestler.year)
	}
	async save() {
		return this.saveBtn.click()
	}
	async closeTab() {
		return this.closeBtn.click()
	}
	async deleteWrestler() {
		await this.deleteBtn.click()
		return await this.confirmBtn.click()
	}
}

module.exports = WrestlerPage