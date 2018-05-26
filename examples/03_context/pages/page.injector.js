const { Injector } = require('taf')

class PageInjector extends Injector {
	constructor(driver) {
		super()
		this.driver = driver
	}
	load(loader) {
		loader.loadDir(__dirname + '/classes')
	}
}

module.exports = PageInjector
