const DefaultApi = require('../api/DefaultApi')

class Asins extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'asins'
	}

	async getSuggestedKeywordsByAsins(profileId, asins, maxNumSuggestions = 1000) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			'suggested',
			'keywords',
		], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
			method: 'POST',
			data: {
				asins,
				maxNumSuggestions,
			},
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getSuggestedKeywordsByAsin(profileId, asin, maxNumSuggestions = 1000) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			asin,
			'suggested',
			'keywords',
			`?maxNumSuggestions=${maxNumSuggestions}`,
		], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
			method: 'POST',
		}
		const response = await this.request(requestItems)

		return response.data
	}

}

module.exports = Asins
