const { Stage, Status } = require('allure2-js-commons')

class TestAllureReporter {
	constructor(group) {
		this.group = group
		this.steps = []
	}

	get runningStep() {
		return this.steps[this.steps.length - 1]
	}

	beforeTest(test) {
		this.group = this.group.startGroup(test.name)
	}

	afterTest() {
		this.group.endGroup()
	}

	addLabel(name, value) {
		this.test.addLabel(name, value)
	}

	beforeStarted(name) {
		this.before = this.group.addBefore()
		this.steps.push(this.before.startStep(name))
	}

	beforeDone(result) {
		this.stepDone(result)
	}

	afterStarted(name) {
		this.after = this.group.addAfter()
		this.steps.push(this.after.startStep(name))
	}

	afterDone(result) {
		this.stepDone(result)
	}

	testStarted(test) {
		this.group.name = test.name
		this.test = this.group.startTest(test.name)
		this.test.stage = Stage.RUNNING
		this.steps.push(this.test)
	}

	testDone(result) {
		this._setResult(this.test, result)
		this.test.endTest()
	}

	stepStarted(name) {
		const startedStep = this.runningStep.startStep(name)
		startedStep.stage = Stage.RUNNING
		this.steps.push(startedStep)
	}

	stepDone(result) {
		const startedStep = this.steps.pop()
		this._setResult(startedStep, result)
		startedStep.endStep()
	}

	_setResult(entity, rslt) {
		const { status, result } = rslt
		entity.status = status
		entity.stage = Stage.FINISHED
		if (status === Status.FAILED || status === Status.BROKEN) {
			entity.detailsMessage = result.message;
			entity.detailsTrace = result.stack;
		}
	}

}

module.exports = TestAllureReporter