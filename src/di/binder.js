class Binder {
	constructor() {
		this.bindings = new Map()
	}
	clone(binder) {
		binder.bindings.forEach((v, k) => {
			this.bindings.set(k, v)
		})
	}
	bind(key) {
		const
			self = this,
			binding = (key, type) => ({ key, type })
		return {
			to(otherKey) {
				self.bindings.set(key, binding(otherKey, 'key'))
				return self
			},
			toProvider(provider) {
				self.bindings.set(key, binding(provider, 'provider'))
				return self
			},
			toSingleton() {
				self.bindings.set(key, binding(key, 'singleton'))
				return self
			},
			toValue(value) {
				self.bindings.set(key, binding(value, 'value'))
				return self
			}
		}
	}
	getKey(boundKey) {
		let key = boundKey,
			type = 'key'
		if (this.bindings.has(key)) {
			return this.bindings.get(key)
		}
		return { key, type }
	}
}

module.exports = Binder