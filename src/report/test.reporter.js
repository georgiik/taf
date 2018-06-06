/** @namespace Reporter */

/** Class implementing Test reporter
 * @memberOf Reporter
 * */
class TestReporter {
	constructor() {
		this.reporters = []
	}

	addReporter(reporter) {
		this.reporters.push(reporter)
	}

	addLabel(name, value) {
		this.reporters.forEach(reporter => reporter.addLabel && reporter.addLabel(name, value))
	}

	testStarted(test) {
		this.reporters.forEach(reporter => reporter.testStarted(test))
	}

	testDone(test, result) {
		this.reporters.forEach(reporter => reporter.testDone(test, result))
	}

	testBodyStarted(test) {
		this.reporters.forEach(reporter => reporter.testBodyStarted(test))
	}

	testBodyDone(result) {
		this.reporters.forEach(reporter => reporter.testBodyDone(result))
	}

	beforeEachStarted(name) {
		this.reporters.forEach(reporter => reporter.beforeEachStarted(name))
	}

	beforeEachDone(result) {
		this.reporters.forEach(reporter => reporter.beforeEachDone(result))
	}

	afterEachStarted(name) {
		this.reporters.forEach(reporter => reporter.afterEachStarted(name))
	}

	afterEachDone(result) {
		this.reporters.forEach(reporter => reporter.afterEachDone(result))
	}

	stepStarted(name, start = Date.now()) {
		this.reporters.forEach(reporter => reporter.stepStarted && reporter.stepStarted(name, start))
	}

	stepDone(status, end = Date.now()) {
		this.reporters.forEach(reporter => reporter.stepDone && reporter.stepDone(status, end))
	}
}

module.exports = TestReporter
