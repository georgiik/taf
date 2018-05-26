class Users {
	get valid() {
		return {
			username: 'auto',
			password: 'test',
			toString() {
				return 'validUser'
			}
		}
	}
	get invalid() {
		return {
			username: 'auto',
			password: 'test1',
			toString() {
				return 'invalidUser'
			}
		}
	}
}

module.exports = Users