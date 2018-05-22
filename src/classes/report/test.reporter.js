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

	feature(feature) {
		this.addLabel('feature', feature)
	}

	story(story) {
		this.addLabel('story', story)
	}

	testStarted(test) {
		this.reporters.forEach(reporter => reporter.testStarted(test))
	}

	testDone(result) {
		this.reporters.forEach(reporter => reporter.testDone(result))
	}

	stepStarted(name, start = Date.now()) {
		this.reporters.forEach(reporter => reporter.stepStarted && reporter.stepStarted(name, start))
	}

	stepDone(status, end = Date.now()) {
		this.reporters.forEach(reporter => reporter.stepDone && reporter.stepDone(status, end))
	}

	beforeStarted(name) {
		this.reporters.forEach(reporter => reporter.beforeStarted(name))
	}

	beforeDone(result) {
		this.reporters.forEach(reporter => reporter.beforeDone(result))
	}

	afterStarted(name) {
		this.reporters.forEach(reporter => reporter.afterStarted(name))
	}

	afterDone(result) {
		this.reporters.forEach(reporter => reporter.afterDone(result))
	}

	beforeTest(test) {
		this.reporters.forEach(reporter => reporter.beforeTest(test))
	}

	afterTest(test, result) {
		this.reporters.forEach(reporter => reporter.afterTest(test, result))
	}

	/*createAttachment(name, content, type) {
		this.allure.addAttachment(name, content, type)
	}

	attachJSON(name, json) {
		this.createAttachment(name, JSON.stringify(json, null, '\t'), 'application/json')
	}


	async attachScreenshot(png, name = 'screenshot') {
		this.allure.addAttachment(name, new Buffer(png, 'base64'), 'image/png')
	}*/

}

module.exports = TestReporter
