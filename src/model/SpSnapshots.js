
const DefaultApi = require('../api/DefaultApi')

class spSnapshots extends DefaultApi {

	/**
	 * @param {object} credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'snapshots'
	}

	async requestSnapshot(snapshotType, snapshotOptions, profileId = undefined) {
		if (profileId) this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([
			this.api,
			snapshotType,
			'snapshot',
		], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
			method: 'POST',
			data: snapshotOptions,
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getSnapshot(snapshotId, profileId = undefined) {
		if (profileId) this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, snapshotId ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
			method: 'GET',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getSnapshotTempDownloadURL(locationUrl) {
		const requestItems = {
			headers: this.headers,
			url: locationUrl,
			method: 'GET',
			maxRedirects: 0,
		}
		const response = await this.request(requestItems)

		return response.location
	}

	async getSnapshotData(url) {
		const requestItems = {
			url,
			method: 'GET',
			maxRedirects: 0,
		}
		const response = await this.request(requestItems)

		return response.data
	}

	/**
	 * @param {string} reportType
	 * @param {object} snapshotOptions
	 * @param {string,int} profileId
	 */
	async processSnapshot(reportType, snapshotOptions, profileId) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let sleepTimer = 1
		const sleepTimeout = 60
		const requestResponse = await this.requestSnapshot(reportType, snapshotOptions)
		let snapshotResponse = { status: 'IN_PROGRESS' }
		while (snapshotResponse.status === 'IN_PROGRESS') {
			sleepTimer *= 2
			await this.cawer.sleep(sleepTimer)
			if (sleepTimer > sleepTimeout) throw new Error(`SleepTime reached timeout [${sleepTimeout}]`)

			const reportId = requestResponse.snapshotId
			snapshotResponse = await this.getSnapshot(reportId)
		}

		if (snapshotResponse.status === 'SUCCESS') {
			const tempDownloadLocation = await this.getSnapshotTempDownloadURL(snapshotResponse.location)
			const snapshotData = await this.getSnapshotData(tempDownloadLocation)

			return snapshotData
		}

		throw new Error(snapshotResponse.statusDetails)
	}

}

module.exports = spSnapshots
