const emptyFn = () => {}

class TestExecution {
	constructor(props) {
		Object.assign(this, props)
		this.before = this.before || emptyFn
		this.after = this.after || emptyFn
	}
	beforeEachTest(fn = emptyFn) {
		this.beforeEach = fn
	}
	test(fn) {
		this.testBody = fn
	}
	afterEachTest(fn = emptyFn) {
		this.afterEach = fn
	}
}

module.exports = TestExecution