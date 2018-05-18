const fs = require("fs")

class Loader {
	constructor() {
		this.classIndex = new Map()
		this.init()
	}
	static classToKey(cls) {
		return cls.name.substr(0, 1).toLocaleLowerCase() + cls.name.substr(1)
	}
	static classKey(key) {
		return key.toUpperCase()
	}
	init() {
		this.classIndex.set('LOADER', Loader)
		this.loadFile(__dirname + '/./injector.js')
		this.loadFile(__dirname + '/./binder.js')
	}
	hasClass(key) {
		const upKey = Loader.classKey(key)
		return this.classIndex.has(upKey)
	}
	getClass(key) {
		const upKey = Loader.classKey(key)
		if (this.classIndex.has(upKey)) {
			return this.classIndex.get(upKey)
		}
		throw new Error(`No class found for: ${upKey}`)
	}
	registerClass(cls) {
		const key = Loader.classKey(Loader.classToKey(cls))
		this.classIndex.set(Loader.classKey(key), cls)
	}
	loadFile(file) {
		const cls = require(file)
		if (!Reflect.has(cls, 'name')) {
			throw new Error(`Error loading file, ensure that file contains class: ${file}`)
		}
		this.registerClass(cls)
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
}

module.exports = Loader