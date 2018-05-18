const Loader = require('./loader')
const Binder = require('./binder')

const propertyHandler = {
	get(target, key) {
		if (typeof key === 'symbol' || key === 'inspect') {
			return
		}
		if (Reflect.has(target, key)) {
			return target[key]
		}
		return target.getInstance(key)
	}
}

class Injector {
	constructor() {
		this.binder = new Binder()
		this.loader = new Loader()
		this.singletons = new Map()

		this.load(this.loader)
		this.bind(this.binder)

		this._defineSelfGetter()
	}

	load(loader) {}
	bind(binder) {}
	getInstance(cls) {
		return typeof cls === 'string' ? this.getInstanceByKey(cls) : this.getInstanceByClass(cls)
	}
	asProperties() {
		return new Proxy(this, propertyHandler)
	}
	getInstanceByClass(cls) {
		const injectingProxy = this.asProperties()
		const instance = new cls(injectingProxy)
		return instance
	}
	getInstanceByKey(theKey) {
		const { key, type } = this.binder.getKey(theKey)
		if (type === 'value') {
			return key
		}
		if (type === 'singleton') {
			return this._bySingleton(key)
		}
		if (type === 'provider') {
			return this._byProvider(key)
		}
		return this._byKey(key)
	}
	_bySingleton(key) {
		if (!this.singletons.has(key)) {
			let instance = this._byKey(key)
			this.singletons.set(key, instance)
		}
		return this.singletons.get(key)
	}
	_byProvider(key) {
		return this[key]
	}
	_byKey(key) {
		const cls = this.loader.getClass(key)
		return this.getInstanceByClass(cls)
	}
	_defineSelfGetter() {
		const injectorName = Object.getPrototypeOf(this).constructor
		const selfKey = Loader.classToKey(injectorName)
		Object.defineProperty(this, 'injectorName', { value: selfKey })
	}
}

module.exports = Injector