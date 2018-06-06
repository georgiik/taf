# TAF
TAF is a test runner for JavaScript.
## Getting started
### Install TAF
`npm install -g taf`
### 1. Simple tests 
#### 1.1 Create tests in *tests* folder
Each test method name should start with *test*.
```js
const assert = require('assert')

class TestOne {
    testAlwaysPassingTest1() {
        return async () => {
            assert.equal(1, 1, "Equals")
        }
    }
    testAlwaysFailingTest1() {
    	return async () => {
    	    assert.equal(1, 2)
    	}
    }
    testAlwaysBrokenTest1() {
        return async () => {
            throw Error('AlwaysBrokenTest')
        }
    }
}

module.exports = TestOne
```
#### 1.2 Run tests
`taf --tests ./tests`
### 2. Tests with properties 
#### 2.1 Create tests with properties
```js
const assert = require('assert')

class TestTwo {
    testAlwaysPassingTest2(testProperties) {
        testProperties.severity = 'Blocker'
        return async () => {
            assert.equal(1, 1, "Equals")
        }
    }
    testAlwaysFailingTest2(testProperties) {
        testProperties.severity = 'Major'
        return async () => {
            assert.equal(1, 2)
        }
    }
    testAlwaysBrokenTest2(testProperties) {
        testProperties.severity = 'Minor'
        return async () => {
            throw Error('AlwaysBrokenTest')
        }
    }
}

module.exports = TestTwo
```
#### 2.2 Create test suite *blocker.suite* in *suites* folder
By default tests are run in one thread, to override this setting add *threadCount* to test suite.

To select tests which have severity Blocker define *query* method. This method will be called with 
*tests* parameter which is array of all tests from *tests* folder. This method should return array 
of tests to be run as suite.
```js
module.exports = {
    threadCount: 2,
    query(tests) {
       return tests.filter(test => test.severity === 'Blocker')
    }
}
```
#### 2.3 Run test suite
`taf --tests ./tests --suite ./suites/blocker.suite.js`
### 3. Tests with context
#### 3.1 Create tests with context
Each test body is now have *testContext* parameter. This parameter is object passed to each test.
```js
const assert = require('assert')

class TestThree {
    testAlwaysPassingTest3(testProperties) {
        testProperties.severity = 'Blocker'
        testProperties.withContext = true
        return async (testContext) => {
            const {value} = testContext
            assert.equal(value, 1)
        }
    }
    testAlwaysFailingTest3(testProperties) {
        testProperties.severity = 'Major'
        testProperties.withContext = true
        return async (testContext) => {
            const {value} = testContext
            assert.equal(value, 2)
        }
    }
}

module.exports = TestThree
```
#### 3.2 Create context provider
Context provider class should have *getContext* method. This method will be called with *context* parameter 
which contains default context. In this method we can extend the default context by adding more properties. 
For this example the property is *value*. Method *getContext* is going to be called before each test and result of 
this method will be injected into test.

```js
class TestContext {
    getContext(context) {
        context.value = 1
        return context
    }
}

module.exports = TestContext
```
#### 3.3 Create test suite *context.suite* in *suites* folder
```js
module.exports = {
    threadCount: 2,
    query(tests) {
        return tests.filter(test => test.withContext)
    }
}
```
#### 3.4 Run test suite with context
`taf --tests ./tests --suite ./suites/context.suite.js --context ./context/test.context.js`
### 4. Configuration
It is possible to put all command-line arguments into config file.
#### 4.1 Create config file
```js
module.exports = {
    tests: './tests',
    suite: './suites/context.suite',
    context: './context/test.context'
}
```
#### 4.2 Run tests
`taf --config config.js`

### 5.Examples
See code for this Getting Started:
https://github.com/georgiik/taf_examples
