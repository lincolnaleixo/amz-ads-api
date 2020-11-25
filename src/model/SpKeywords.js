const DefaultApi = require('../api/DefaultApi')

class SpKeywords extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'keywords'
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async createKeywords(profileId, options) {
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
			throw new Error(`Error on creating keywords\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async updateKeywords(profileId, options) {
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
			throw new Error(`Error on updating keywords\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} keywordId
	 * @param {string,int} profileId
	 */
	async getKeyword(profileId, keywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, keywordId.toString() ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getKeywordExtended(profileId, keywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			'extended',
			keywordId.toString(),
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
	async getKeywords(profileId, options) {
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

	async getKeywordsExtended(profileId, options = {}) {
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
	 * @param {string,int} keywordId
	 */
	async archiveKeyword(profileId, keywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, keywordId.toString() ], 'sp')
		const requestItems = {
			method: 'DELETE',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data.code !== 'SUCCESS') {
			throw new Error(`Error on archiving keyword\n${response.data.code}: ${response.data.description}`)
		}

		return response.data.code
	}

	async getKeywordBidRecommendations(profileId, keywordId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			keywordId.toString(),
			'bidRecommendations',
		], 'sp')
		const requestItems = {
			method: 'POST',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getKeywordsBidRecommendations(profileId, options) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let url = this.createUrl([ this.api, 'bidRecommendations' ], 'sp')

		if (options) url += `?${this.qs.stringify(options)}`

		const requestItems = {
			method: 'POST',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

}

module.exports = SpKeywords
