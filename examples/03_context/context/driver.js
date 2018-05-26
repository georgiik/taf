const awb = require('awb')

const defaultOpts = {
	withStandalone: true,
	remote: false,
	directConnect: false,
	host: 'localhost',
	port: 4444,
	desiredCapabilities: {
		javascriptEnabled: true,
		acceptSslCerts: true,
		platform: 'ANY',
		browserName: 'chrome'
	},
	timeout: 50000
}

class Driver {
	constructor() {
		return awb(defaultOpts)
	}
}

module.exports = Driver