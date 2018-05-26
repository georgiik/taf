class AppStates {
	constructor({ driver }) {
		this.driver = driver
	}
	atLoginPage() {
		return this.driver.client.goTo('http://streamtv.net.ua/base')
	}
	browserClosed() {
		return this.driver.client.close()
	}
}

module.exports = AppStates