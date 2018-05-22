const Loader = require('../../../src/di/loader')
const TestExecution = require('../test/test.execution')

const isTestMethod = obj => k => k.startsWith('test') && (typeof obj[k] == 'function')
const objMethods = obj => Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
const testMethods = obj => objMethods(obj).filter(isTestMethod(obj))

class Repository extends Loader {
	constructor(testsPath) {
		super()
		this.tests = []
		this.loadDir(testsPath)
		this.init()
	}
	init() {
		this.classIndex.forEach(TestClass => {
			const testInstance = new TestClass()
			testMethods(testInstance).forEach(tName => {
				const name = tName.substr('test'.length)
				const properties = {name}
				const testBody = testInstance[tName](properties)
				const testExecution = new TestExecution(properties, testInstance)
				testExecution.beforeEachTest(testInstance.beforeEach)
				testExecution.test(testBody)
				testExecution.afterEachTest(testInstance.afterEach)
				this.tests.push(testExecution)
			})
		})
	}
}

module.exports = Repository