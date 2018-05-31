#!/usr/bin/env node
const path = require('path')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const MainExecutor = require('../src/classes/executor/main.executor')

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
		typeLabel: '<file>' }
]

const usage = commandLineUsage([
	{
		header: 'TAF',
		content: 'Test Runner'
	},
	{
		header: 'Options',
		optionList: optionDefinitions
	},
	{
		header: 'Example:',
		content:
		'taf --config <configFile>\n'+
		'taf --tests <testsFolder> --suite <suiteFile>\n' +
		'taf --config <configFile> --suite <suiteFile>'
	}
])

const options = commandLineArgs(optionDefinitions)
let config = {}

if (options.config) {
	const loadedConfig = require(path.resolve(options.config))
	Object.assign(config, loadedConfig)
	if (config.tests) {
		config.tests = path.resolve(loadedConfig.tests)
	} else {
		console.log('\nError: No Tests Folder specified in config:', options.config)
	}
	if (config.suite) {
		config.suite = require(path.resolve(loadedConfig.suite))
	} else {
		console.log(`No Suite specified in config: ${options.config}\nRunning all tests from: ${config.tests}`)
	}
}

if (options.tests) {
	config.tests = path.resolve(options.tests)
}

if (options.suite) {
	config.suite = require(path.resolve(options.suite))
}

if (config.tests) {
	new MainExecutor()
		.configure(config)
		.execute(config.suite, config.context)
		.then(r => console.log('DONE'))
} else {
	console.log(usage)
}
