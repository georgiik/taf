const ConsoleReporter = require('./console.reporter')

class Reporter {
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

	createAttachment(name, content, type) {
		this.allure.addAttachment(name, content, type)
	}

	attachJSON(name, json) {
		this.createAttachment(name, JSON.stringify(json, null, '\t'), 'application/json')
	}

	suiteStarted(name) {
		this.reporters.forEach(reporter => reporter.suiteStarted(name))
	}

	suiteDone() {
		this.reporters.forEach(reporter => reporter.suiteDone())
	}

	testStarted(name) {
		this.reporters.forEach(reporter => reporter.testStarted(name))
	}

	testDone(spec) {
		this.reporters.forEach(reporter => reporter.testDone(spec))
	}

	stepStarted(name, start = Date.now()) {
		this.reporters.forEach(reporter => reporter.stepStarted && reporter.stepStarted(name, start))
	}

	stepDone(status, end = Date.now()) {
		this.reporters.forEach(reporter => reporter.stepDone && reporter.stepDone(status, end))
	}

	async attachScreenshot(png, name = 'screenshot') {
		this.allure.addAttachment(name, new Buffer(png, 'base64'), 'image/png')
	}
}

module.exports = Reporter
