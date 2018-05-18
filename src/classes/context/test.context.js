const Reporter = require('../report/reporter')
const ConsoleReporter = require('../report/console.reporter')

class TestContext {
	constructor(disableConsoleReporter) {
		this.reporter = new Reporter()
		if (!disableConsoleReporter) {
			this.reporter.addReporter(new ConsoleReporter())
		}
	}
}

module.exports = TestContext