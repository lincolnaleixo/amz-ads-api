
const DefaultApi = require('../api/DefaultApi')

class SpReports extends DefaultApi {

	/**
	 * Set Amazon Advertising credentials and api param
	 * @param {Credentials} credentials Amazon Advertising credentials
	 */
	constructor(credentials) {
		super(credentials)
		this.api = 'reports'
	}

	async requestReport(profileId, reportType, reportOptions) {
		if (profileId) this.headers['Amazon-Advertising-API-Scope'] = profileId

		const url = this.createUrl([
			this.api,
			reportType,
			'report',
		], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
			method: 'POST',
			data: reportOptions,
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getReport(profileId = undefined, reportId) {
		if (profileId) this.headers['Amazon-Advertising-API-Scope'] = profileId
		const url = this.createUrl([ this.api, reportId ], 'sp')
		const requestItems = {
			headers: this.headers,
			url,
			responseType: 'json',
			method: 'GET',
		}
		const response = await this.request(requestItems)

		return response.data
	}

	async getReportTempDownloadURL(locationUrl) {
		const requestItems = {
			headers: this.headers,
			url: locationUrl,
			method: 'GET',
			maxRedirects: 0,
		}
		const response = await this.request(requestItems)

		return response.location
	}

	/**
	 * @param {string} reportType
	 * @param {object} reportOptions
	 * @param {string,int} profileId
	 */
	async processReport(profileId, reportType, reportOptions) {
		this.headers['Amazon-Advertising-API-Scope'] = profileId
		let sleepTimer = 1
		const sleepTimeout = 60
		const requestResponse = await this.requestReport(reportType, reportOptions)
		let reportResponse = { status: 'IN_PROGRESS' }
		while (reportResponse.status === 'IN_PROGRESS') {
			sleepTimer *= 2
			await this.cawer.sleep(sleepTimer)
			if (sleepTimer > sleepTimeout) throw new Error(`SleepTime reached timeout [${sleepTimeout}]`)

			const reportId = requestResponse.reportId
			reportResponse = await this.getReport(reportId)
		}

		if (reportResponse.status === 'SUCCESS') {
			const tempDownloadLocation = await this.getReportTempDownloadURL(reportResponse.location)
			const reportData = await this.download(tempDownloadLocation)

			return reportData
		}

		throw new Error(reportResponse.statusDetails)
	}

}

module.exports = SpReports
