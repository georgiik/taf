const taf = require('taf')
const { Injector } = taf

class DataInjector extends Injector {
	load(loader) {
		loader.loadDir(__dirname + '/classes')
	}
}

module.exports = DataInjector