const DefaultApi = require('../api/DefaultApi')

class SpTargets extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'targets'
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async createTargets(profileId, options) {
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
			throw new Error(`Error on creating targets\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async updateTargets(profileId, options) {
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
			throw new Error(`Error on updating targets\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @param {string,int} profileId
	 * @param {object} options
	 */
	async getTargets(profileId, options) {
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
	 * @param {string,int} targetId
	 * @param {string,int} profileId
	 */
	async getTarget(profileId, targetId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, targetId.toString() ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async archiveTarget(profileId, targetId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, targetId.toString() ], 'sp')
		const requestItems = {
			method: 'DELETE',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data.code !== 'SUCCESS') {
			throw new Error(`Error on archiving target\n${response.data.code}: ${response.data.description}`)
		}

		return response.data.code
	}

	async getTargetsExtended(profileId, options = {}) {
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

	async getTargetExtended(profileId, targetId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			'extended',
			targetId.toString(),
		], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getProductRecommendations(profileId, options) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, 'productRecommendations' ], 'sp')
		const requestItems = {
			method: 'POST',
			headers: this.headers,
			url,
			responseType: 'json',
			data: options,
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getCategories(profileId, asins) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let url = this.createUrl([ this.api, 'categories' ], 'sp')

		if (asins) url += `?${asins.join(',')}`
		else throw new Error('At least one asin is required')

		const requestItems = {
			method: 'POST',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getCategoriesRefinements(profileId, categoryId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let url = this.createUrl([
			this.api,
			'categories',
			'refinements',
		], 'sp')

		if (categoryId) url += `?${categoryId.join(',')}`
		else throw new Error('Category id required')

		const requestItems = {
			method: 'POST',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getBrands(profileId, options) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let url = this.createUrl([ this.api, 'brands' ], 'sp')

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

	async getTargetsBidRecommendations(profileId, options) {
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

	async getKeywordsRecommendations(profileId, options) {
		this.apiVersion = 'v3'
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let url = this.createUrl([
			this.api,
			'keywords',
			'recommendation',
		], 'sp')

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

module.exports = SpTargets
