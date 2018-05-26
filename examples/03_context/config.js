module.exports = {
	tests: './tests',
	suite: './suites/all.suite.js',
	onConfigure() {
		global.expect = require('chai').expect
	}
}