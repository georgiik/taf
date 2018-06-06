const fs = require('fs')
const TestExecution = require('./test.execution')

const isTestMethod = obj => k => k.startsWith('test') && (typeof obj[k] == 'function')
const objMethods = obj => Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
const testMethods = obj => objMethods(obj).filter(isTestMethod(obj))

/** @namespace Scope */

/** Class implementing Test repository
 * @memberOf Scope
 * */
class TestRepository{
	constructor() {
        this.classIndex = []
		this.tests = []
	}
    loadFile(file) {
        const cls = require(file)
        if (!Reflect.has(cls, 'name')) {
            throw new Error(`Error loading file, ensure that file contains class: ${file}`)
        }
        this.classIndex.push(cls)
    }
    loadDir(dir, recursive = true) {
        fs.readdirSync(dir).forEach(file => {
            const path = dir + '/' + file
            if (fs.statSync(path).isDirectory()) {
                if (recursive) {
                    this.loadDir(path)
                }
            } else {
                this.loadFile(path)
            }
        })
    }
	loadTests(testsPath) {
		this.loadDir(testsPath)
		this.classIndex.forEach(TestClass => {
			const testInstance = new TestClass()
			testMethods(testInstance).forEach(testMethod => {
				const name = testMethod.substr('test'.length)
				const properties = {name}
				const instance = new TestClass()
				const testBody = instance[testMethod](properties)
				const testExecution = new TestExecution(properties, instance)
				testExecution.beforeEachTest(instance.beforeEach)
				testExecution.test(testBody)
				testExecution.afterEachTest(instance.afterEach)
				this.tests.push(testExecution)
			})
		})
	}
	addTest(test) {
		this.tests.push(test)
	}
}

module.exports = TestRepository
