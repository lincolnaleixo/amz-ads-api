const DefaultApi = require('../api/DefaultApi')

class SpCampaigns extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'campaigns'
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async createCampaigns(profileId, options) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api ], 'sp')
		const requestItems = {
			method: 'POST',
			headers: this.headers,
			url,
			responseType: 'json',
			data: options,
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data[0].code !== 'SUCCESS') {
			throw new Error(`Error on creating campaigns\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async updateCampaigns(profileId, options) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api ], 'sp')
		const requestItems = {
			method: 'PUT',
			headers: this.headers,
			url,
			responseType: 'json',
			data: options,
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data[0].code !== 'SUCCESS') {
			throw new Error(`Error on updating campaigns\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async getCampaigns(profileId, options) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let url = this.createUrl([ this.api ], 'sp')

		if (options) url += `?${this.qs.stringify(options)}`

		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	/**
	 * @param {string,int} campaignId
	 * @param {string,int} profileId
	 */
	async getCampaign(profileId, campaignId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, campaignId.toString() ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {string,int} campaignId
	 */
	async archiveCampaign(profileId, campaignId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, campaignId.toString() ], 'sp')
		const requestItems = {
			method: 'DELETE',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data.code !== 'SUCCESS') {
			throw new Error(`Error on archiving campaign\n${response.data.code}: ${response.data.description}`)
		}

		return response.data.code
	}

	async getCampaignsExtended(profileId, options = {}) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let url = this.createUrl([ this.api, 'extended' ], 'sp')

		if (options) url += `?${this.qs.stringify(options)}`

		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getCampaignExtended(profileId, campaignId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			'extended',
			campaignId.toString(),
		], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

}

module.exports = SpCampaigns
