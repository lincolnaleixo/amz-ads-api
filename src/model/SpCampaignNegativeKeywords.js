const DefaultApi = require('../api/DefaultApi')

class SpCampaignNegativeKeywords extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'campaignNegativeKeywords'
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async createCampaignNegativeKeywords(profileId, options) {
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
			throw new Error(`Error on creating campaign negative keywords\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async updateCampaignNegativeKeywords(profileId, options) {
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
			throw new Error(`Error on updating campaign negative keywords\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} campaignNegativeKeywordId
	 * @param {string,int} profileId
	 */
	async getNegativeKeyword(profileId, campaignNegativeKeywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, campaignNegativeKeywordId.toString() ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getCampaignNegativeKeywordExtended(profileId, campaignNegativeKeywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			'extended',
			campaignNegativeKeywordId.toString(),
		], 'sp')
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
	 * @param {object} options
	 */
	async getCampaignNegativeKeywords(profileId, options) {
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

	async getCampaignNegativeKeywordsExtended(profileId, options = {}) {
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

	/**
	 * @param {string,int} profileId
	 * @param {string,int} campaignNegativeKeywordId
	 */
	async archiveCampaignNegativeKeyword(profileId, campaignNegativeKeywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, campaignNegativeKeywordId.toString() ], 'sp')
		const requestItems = {
			method: 'DELETE',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data.code !== 'SUCCESS') {
			throw new Error(`Error on archiving campaign negative keyword\n${response.data.code}: ${response.data.description}`)
		}

		return response.data.code
	}

}

module.exports = SpCampaignNegativeKeywords
