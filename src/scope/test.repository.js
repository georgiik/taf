const fs = require('fs')
const TestExecution = require('./test.execution')

const isTestMethod = obj => k => k.startsWith('test') && (typeof obj[k] === 'function')
const objMethods = obj => Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
const testMethods = obj => objMethods(obj).filter(isTestMethod(obj))

function cutStack(error) {
    const stack = error.stack.split('\n')
    let index
    for (let i = 0; i < stack.length; i++) {
        if (stack[i].includes('testMethods')) {
            index = i
            break
        }
    }
    error.stack = stack.slice(0, index).join('\n')
    return error
}

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
				let testBody
				let error = false
				try {
                    testBody = testInstance[testMethod](properties)
				} catch (e) {
					error = cutStack(e)
				}
				if (!error) {
                    const testExecution = new TestExecution(properties)
                    testExecution.beforeEachTest(testInstance.beforeEach)
                    testExecution.test(testBody)
                    testExecution.afterEachTest(testInstance.afterEach)
                    this.tests.push(testExecution)
				} else {
					console.log('Error while loading test:', testInstance.constructor.name)
					console.log(error)
				}
			})
		})
	}
	addTest(test) {
		this.tests.push(test)
	}
}

module.exports = TestRepository
