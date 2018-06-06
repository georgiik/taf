const SuiteContext = require('../context/suite.context')
const ExitCondition = require('../exit/exit.condition')

module.exports = {
    threadCount : 1,
    query(tests) {
        return tests
    }
}
