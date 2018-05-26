class BasePage {
	constructor(driver) {
		this.client = driver.client
		this.$ = driver.element
		this.$$ = driver.elements
	}
}

module.exports = BasePage