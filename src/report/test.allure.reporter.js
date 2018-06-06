const { Stage, Status } = require('allure2-js-commons')
/** Class implementing Test Allure reporter
 * @memberOf Reporter
 * */
class TestAllureReporter {
	constructor(group) {
		this.group = group
		this.steps = []
	}

	get runningStep() {
		return this.steps[this.steps.length - 1]
	}

	addLabel(name, value) {
		this.test.addLabel(name, value)
	}

	testStarted(test) {
		this.group = this.group.startGroup(test.name)
	}

	testDone() {
		this.group.endGroup()
	}

	testBodyStarted(test) {
		this.group.name = test.name
		this.test = this.group.startTest(test.name)
		this.test.stage = Stage.RUNNING
		this.steps.push(this.test)
	}

	testBodyDone(result) {
		this._setResult(this.test, result)
		this.test.endTest()
	}

	beforeEachStarted(name) {
		this.before = this.group.addBefore()
		this.steps.push(this.before.startStep(name))
	}

	beforeEachDone(result) {
		this.stepDone(result)
	}

	afterEachStarted(name) {
		this.after = this.group.addAfter()
		this.steps.push(this.after.startStep(name))
	}

	afterEachDone(result) {
		this.stepDone(result)
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