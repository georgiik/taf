const { Wrapper } = require('taf')

class PageWrapper extends Wrapper {
	constructor(pageInjector, pageObjectWrapper) {
		super(pageInjector, pageObjectWrapper)
	}
}

module.exports = PageWrapper