const DefaultApi = require('../api/DefaultApi')

class SpKeywords extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'negativeKeywords'
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async createNegativeKeywords(profileId, options) {
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
			throw new Error(`Error on creating negative keywords\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async updateNegativeKeywords(profileId, options) {
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
			throw new Error(`Error on updating negative keywords\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} negativeKeywordId
	 * @param {string,int} profileId
	 */
	async getNegativeKeyword(profileId, negativeKeywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, negativeKeywordId.toString() ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getNegativeKeywordExtended(profileId, negativeKeywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			'extended',
			negativeKeywordId.toString(),
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
	async getNegativeKeywords(profileId, options) {
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

	async getNegativeKeywordsExtended(profileId, options = {}) {
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
	 * @param {string,int} negativeKeywordId
	 */
	async archiveNegativeKeyword(profileId, negativeKeywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, negativeKeywordId.toString() ], 'sp')
		const requestItems = {
			method: 'DELETE',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data.code !== 'SUCCESS') {
			throw new Error(`Error on archiving negative keyword\n${response.data.code}: ${response.data.description}`)
		}

		return response.data.code
	}

}

module.exports = SpKeywords
