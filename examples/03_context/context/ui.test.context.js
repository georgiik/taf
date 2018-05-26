const { TestContext } = require('taf')
const Driver = require('./driver')
const PageInjector = require('../pages/page.injector')
const DataInjector = require('../data/data.injector')
const PageObjectWrapper = require('../wrapper/page.object.wrapper')
const PageWrapper = require('../wrapper/page.wrapper')

class UiTestContext extends TestContext {
	constructor(reporter) {
		super(reporter)
		this.driver = new Driver()
		const pageInjector = new PageInjector(this.driver)
		const pageObjectWrapper = new PageObjectWrapper(this.reporter)
		this.page = new PageWrapper(pageInjector, pageObjectWrapper).asProperties()
		this.data = new DataInjector().asProperties()
	}
}

module.exports = UiTestContext