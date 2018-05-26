class PageObjectWrapper {
	constructor(reporter) {
		this.reporter = reporter
	}
	get methodWrapper() {
		const self = this
		return {
			before(method, args) {
				self.reporter.stepStarted(`${method.name}(${args})`)
			},
			after(result) {
				let status = 'passed'
				if (result instanceof Error) {
					status = 'broken'
					if (result.name.includes('Assertion')) {
						status = 'failed'
					}
				}
				self.reporter.stepDone({ status, result })
			}
		}
	}
}

module.exports = PageObjectWrapper