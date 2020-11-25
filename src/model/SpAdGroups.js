const DefaultApi = require('../api/DefaultApi')

/**
 * Implementation of Sponsored Products AdGroups Module
 * @class
 * @extends DefaultApi
 */
class SpAdGroups extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
   	*/
	constructor(credentials) {
		super(credentials)
		this.api = 'adGroups'
	}

	/**
	 * @async
	 * @function createAdGroups
	 * {@link https://advertising.amazon.com/API/docs/en-us/sponsored-products/2-0/openapi#/Ad%20groups/createAdGroups API reference}
	 * @description Creates one or more ad groups.
	 * @param {string,int} profileId The identifier of a profile associated with the advertiser account
	 * @param {CreateAdGroup[]} options CreateAdGroup params array used to create the specified adGroup(s)
	 * @returns {AdGroupResponse[]} adGroups array creation response object
	 * @throws response code and description
	 */
	async createAdGroups(profileId, options) {
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
			throw new Error(`Error on creating adGroups\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @async
	 * @description Updates one or more ad groups.
	 * @param {string,int} profileId The identifier of a profile associated with the advertiser account
	 * @param {UpdateAdGroup[]} options UpdateAdGroup params array used to update the specified adGroup(s)
	 * @returns {AdGroupResponse[]} adGroups array update response object
	 * @throws response code and description
	 */
	async updateAdGroups(profileId, options) {
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
			throw new Error(`Error on updating adGroups\n${response.data[0].code}: ${response.data[0].description}`)
		}

		return response.data
	}

	/**
	 * @async
	 * @description Gets an array of adGroups.
	 * @param {string,int} profileId The identifier of a profile associated with the advertiser account
	 * @param {GetAdGroups[]} options getAdGroups params array used to retrieve adGroups list
	 * @returns {AdGroup[]} adGroups response array list
	 */
	async getAdGroups(profileId, options = {}) {
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
	 * @async
	 * @description Gets an ad group specified by identifier.
	 * @param {string,int} profileId The identifier of a profile associated with the advertiser account
	 * @param {string,int} adGroupId
	 * @returns {AdGroup} specific adGroup response information
	 */
	async getAdGroup(profileId, adGroupId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, adGroupId.toString() ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	/**
	 * @async
	 * @description Sets the ad group status to archived. Archived entities cannot be made active again.
	 * @param {string,int} profileId The identifier of a profile associated with the advertiser account.
	 * @param {string,int} adGroupId The identifier of an existing ad group to be archived
	 * @returns {AdGroupResponse} archive adGroup operation response
	 */
	async archiveAdGroup(profileId, adGroupId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, adGroupId.toString() ], 'sp')
		const requestItems = {
			method: 'DELETE',
			headers: this.headers,
			url,
			responseType: 'json',
		}
		const response = await this.request(requestItems)

		if (!response || !response.data || response.data.code !== 'SUCCESS') {
			throw new Error(`Error on archiving adGroup\n${response.data.code}: ${response.data.description}`)
		}

		return response.data.code
	}

	/**
	 * @async
	 * @description Gets ad groups that have extended data fields.
	 * @param {string,int} profileId The identifier of a profile associated with the advertiser account
	 * @param {GetAdGroups[]} [options={}] options to retrieve adGroups list with extended data
	 * @returns {AdGroupEx[]} adGroups response array list with extended data
	 */
	async getAdGroupsExtended(profileId, options = {}) {
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
	 * @async
	 * @description Gets an ad group that has extended data fields.
	 * @param {string,int} profileId The identifier of a profile associated with the advertiser account
	 * @param {string,int} adGroupId
	 * @returns {AdGroupEx} specific adGroup response information with extended data
	 */
	async getAdGroupExtended(profileId, adGroupId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			'extended',
			adGroupId.toString(),
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
	 * @async
	 * @description Gets bid recommendation for an adGroup.
	 * @param {number} adGroupId The identifier of the ad group.
	 * @param {number} profileId The identifier of a profile associated with the advertiser account.
	 * @returns {AdGroupBidRecommendationsResponse} specific adGroups response information
	 */
	async getAdGroupBidRecommendations(profileId, adGroupId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			adGroupId.toString(),
			'bidRecommendations',
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
	 * @async
	 * @description Gets suggested keywords for the specified ad group.
	 * @param {string} profileId The identifier of a profile associated with the advertiser account
	 * @param {string} adGroupId The identifier of a valid ad group.
	 * @param {object} [options={}] options to retrieve adGroups suggested keywords list
	 * @param {number} [options.maxNumSuggestions=1000] The maximum number of suggested keywords for the response.
	 * @param {('enabled' | 'paused' | 'archived' | 'enabled, paused' | 'enabled, archived' | 'paused, archived' | 'enabled, paused, archived')} [options.stateFilter] Filters results to ad groups with state matching the comma-delimited list.
	 * @returns {AdGroupSuggestedKeywordsResponse} adGroup suggested keywords info
	 */
	async getAdGroupSuggestedKeywords(profileId, adGroupId, options = {}) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			adGroupId.toString(),
			'suggested',
			'keywords',
			options.maxNumSuggestions || 1000,
			options.adStateFilter || 'enabled',
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
	 * @async
	 * @description Gets suggested keywords with extended data for the specified ad group.
	 * @param {string} profileId The identifier of a profile associated with the advertiser account
	 * @param {string} adGroupId The identifier of a valid ad group.
	 * @param {object} [options={}] options to retrieve adGroups suggested keywords list with extended data
	 * @param {number} [options.maxNumSuggestions=1000] The maximum number of suggested keywords for the response.
	 * @param {('yes'|'no')} [options.suggestBids=yes] Set to yes to include a suggest bid for the suggested keyword in the response. Otherwise, set to no.
	 * @param {('enabled' | 'paused' | 'archived' | 'enabled, paused' | 'enabled, archived' | 'paused, archived' | 'enabled, paused, archived')} [options.stateFilter] Filters results to ad groups with state matching the comma-delimited list.
	 * @returns {object} adGroup suggested keywords info with extended data
	 */
	async getAdGroupSuggestedKeywordsExtended(profileId, adGroupId, options = {}) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			adGroupId.toString(),
			'suggested',
			'keywords',
			options.maxNumSuggestions || 1000,
			options.adStateFilter || 'enabled',
			'extended',
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

module.exports = SpAdGroups
