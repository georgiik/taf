#!/usr/bin/env node
const path = require('path')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const Executor = require('./src/classes/executor')

const optionDefinitions = [
	{
		name: 'config',
		type: String,
		description: 'Configuration file.',
		typeLabel: '<file>' },
	{
		name: 'tests',
		type: String,
		description: 'Tests Directory',
		typeLabel: '<dir>' },
	{
		name: 'suite',
		type: String,
		description: 'Test Suite',
		typeLabel: '<file>' },
	{
		name: 'context',
		type: String,
		description: 'Test Suite Context',
		typeLabel: '<file>' }
]

const usage = commandLineUsage([
	{
		header: 'Options',
		optionList: optionDefinitions
	},
	{
		header: 'Example:',
		content:
			'pure --config <configFile>\n'+
			'pure --tests <testsFolder> --suite <suiteFile> --context <contextFile>\n' +
			'pure --config <configFile> --suite <suiteFile>'
	}
])

const options = commandLineArgs(optionDefinitions)

let config = {}

if (options.config) {
	const loadedConfig = require(path.resolve(options.config))
	Object.assign(config, loadedConfig)
	config.tests = path.resolve(loadedConfig.tests)
	config.suite = require(path.resolve(loadedConfig.suite))
	config.context = require(path.resolve(loadedConfig.context))
}

if (options.suite) {
	config.suite = require(path.resolve(options.suite))
}

if (options.context) {
	config.context = require(path.resolve(options.context))
}

if (config.tests && config.suite && config.context) {
	new Executor()
		.configure(config)
		.execute(config.suite, config.context)
		.then(r => console.log('DONE'))
} else {
	console.log(usage)
}

const direct = require.main === module

console.log('direct:' + direct)

module.exports.ConsoleReporter = require('./src/classes/report/console.reporter')
