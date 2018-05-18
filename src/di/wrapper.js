const Injector = require('./injector')

class Wrapper extends Injector {
	constructor(injector, objWrapper) {
		super()
		this.injector = injector
		this.objWrapper = objWrapper
	}
	getInstance(key) {
		const instance = this.injector.getInstance(key)
		return this.wrapObj(instance, this.objWrapper)
	}
	wrapMethod(method, methodWrapper) {
		return new Proxy(method, {
			apply(target, thisArg, args) {
				const execute = async () => {
					methodWrapper.before(method, args)
					const result = await Reflect.apply(target, thisArg, args)
					methodWrapper.after(result)
					return result
				}
				return execute()
			}
		})
	}
	wrapObj(obj, objWrapper) {
		const self = this
		return new Proxy(obj, {
			get(target, key) {
				if (typeof target[key] === 'function') {
					return self.wrapMethod(target[key], objWrapper.methodWrapper)
				}
				return target[key]
			}
		})
	}
}

module.exports = Wrapper