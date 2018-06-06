module.exports = {
    threadCount: 2,
    query(tests) {
        return tests.filter(test => test.severity === 'Blocker')
    }
}
