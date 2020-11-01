const DefaultApi = require('../api/DefaultApi')

class Profiles extends DefaultApi {

	/**
   * @param {object} credentials
   */
	constructor(credentials) {
		super(credentials)
		this.api = 'profiles'
	}

	async listProfiles() {
		const url = this.createUrl([ this.api ])
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getProfile(profileId) {
		const url = this.createUrl([ this.api, profileId ])
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async updateProfile(options) {
		const url = this.createUrl([ this.api ])
		const requestItems = {
			method: 'PUT',
			headers: this.headers,
			url,
			responseType: 'json',
			data: options,
		}
		const response = await this.request(requestItems)

		return response.data
	}

}

module.exports = Profiles
