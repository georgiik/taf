const unique = Date.now()

class Wrestlers {
	get wrestlerCreate() {
		return {
			lastName: 'LastName' + unique,
			firstName: 'FirstName' + unique,
			middleName: 'MiddleName' + unique,
			dob: '11-02-1980',
			region1: 'Volynska',
			fst1: 'Ukraina',
			style: 'FS',
			age: 'Senior',
			year: '2017'
		}
	}
	get wrestlerRead() {
		return {
			lastName: 'LastName' + unique,
			firstName: 'FirstName' + unique,
			middleName: 'MiddleName' + unique,
			dob: '11-02-1980',
			region1: 'Volynska',
			fst1: 'Ukraina',
			style: 'FS',
			age: 'Senior',
			year: '2017'
		}
	}
	get wrestlerDelete() {
		return {
			lastName: 'LastName' + unique,
			firstName: 'FirstName' + unique,
			middleName: 'MiddleName' + unique,
			dob: '11-02-1980',
			region1: 'Volynska',
			fst1: 'Ukraina',
			style: 'FS',
			age: 'Senior',
			year: '2017'
		}
	}
}

module.exports = Wrestlers