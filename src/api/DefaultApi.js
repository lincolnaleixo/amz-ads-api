const qs = require('qs')
const axios = require('axios').default
const urljoin = require('url-join')
const Cawer = require('cawer')
const download = require('download')
const zlib = require('zlib')
const util = require('util')
const stream = require('stream')
const fs = require('fs-extra')
const rootPath = require('app-root-path').path
const jsonfile = require('jsonfile')
const path = require('path')
const SignHelper = require('../auth/SignHelper')

class DefaultApi {
	/**
	 * @param {object} credentials
	 */
	constructor(credentials) {
		this.credentials = credentials
		this.apiVersion = 'v2'
		this.urljoin = urljoin
		this.axios = axios
		this.signHelper = new SignHelper()
		this.cawer = new Cawer()
		this.qs = qs

		this.headers = {}
		this.headers['Content-Type'] = 'application/json'
		this.headers['User-Agent'] = 'amz-ads-api'
		this.headers['Amazon-Advertising-API-ClientId'] = this.credentials.ADVERTISING_CLIENT_ID
		this.headers.Authorization = `Bearer ${this.credentials.ADVERTISING_ACCESS_TOKEN}`

		this.endpoints = {
			NA: 'https://advertising-api.amazon.com',
			EU: 'https://advertising-api-eu.amazon.com',
			FE: 'https://advertising-api-fe.amazon.com',
		}
	}

	/**
     * @param {object} requestItems
     */
	async request(requestItems) {
		try {
			const response = await this.axios.request(requestItems)

			return response
		} catch (error) {
			if (error.response) {
				if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
					this.credentials = await this.signHelper.refreshToken(this.credentials)
					requestItems.headers.Authorization = `Bearer ${this.credentials.ADVERTISING_ACCESS_TOKEN}`

					return this.request(requestItems)
				}
				if (error.response.status === 307 && error.response.statusText === 'Temporary Redirect') {
					return error.response.headers
				}
				if (error.response.data) {
					throw new Error(`${error.response.data.code}: ${error.response.data.details}\n${requestItems}`)
				}
			}

			throw new Error(error)
		}
	}

	createUrl(params, type = undefined) {
		let url = ''

		if (this.apiVersion === 'v3') this.apiVersion = ''

		if (type) url = this.urljoin(this.endpoints.NA, this.apiVersion, type)
		else url = this.urljoin(this.endpoints.NA, this.apiVersion)

		for (const param of params) {
			url = this.urljoin(url, param)
		}

		return url
	}

	async download(url) {
		const randomNumber = this.getRandomInt(1, 999999)
		const tempFolder = path.join(rootPath, 'temp')
		const tempFilePathCompressed = path.join(tempFolder, `${randomNumber}_temp.gz.json`)
		const tempFilePathUncompressed = path.join(tempFolder, `${randomNumber}_temp.json`)
		fs.ensureDirSync(tempFolder)
		fs.writeFileSync(tempFilePathCompressed, await download(url))

		const readFile = await fs.createReadStream(tempFilePathCompressed)
		const gzip = await zlib.createGunzip()
		const writeUncompressedFile = await fs.createWriteStream(tempFilePathUncompressed)
		const pipelineUnzipFile = await util.promisify(stream.pipeline)
		await pipelineUnzipFile(readFile, gzip, writeUncompressedFile)

		const downloadData = jsonfile.readFileSync(tempFilePathUncompressed)

		fs.unlinkSync(tempFilePathCompressed)
		fs.unlinkSync(tempFilePathUncompressed)

		return downloadData
	}

	// TODO colocar em cawer
	getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)

		return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
	}

}

module.exports = DefaultApi
