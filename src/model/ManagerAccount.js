const DefaultApi = require('../api/DefaultApi')

class ManagerAccount extends DefaultApi {

	/**
   * @param {object} credentials
   */
	constructor(credentials) {
		super(credentials)
		this.api = 'managerAccounts'
	}

	/**
	* @param {string} profileId
   	*/
	async listManagerAccounts(profileId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api ])
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

}

module.exports = ManagerAccount
