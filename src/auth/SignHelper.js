const axios = require('axios').default

class SignHelper {

	constructor() {
		this.authorizationURL = 'https://api.amazon.com/auth/o2/token'
	}

	/**
   * @param {object} credentials
   */
	prepareParams(credentials) {
		const params = new URLSearchParams()

		params.append('grant_type', 'refresh_token')
		params.append('client_id', credentials.ADVERTISING_CLIENT_ID)
		params.append('refresh_token', credentials.ADVERTISING_REFRESH_TOKEN)
		params.append('client_secret', credentials.ADVERTISING_CLIENT_SECRET)

		return params
	}

	/**
   * @param {object} credentials
   */
	async refreshToken(credentials) {
		try {
			const params = this.prepareParams(credentials)
			const response = await axios.request({
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					'User-Agent': 'amz-ads-api',
				},
				method: 'POST',
				url: this.authorizationURL,
				responseType: 'json',
				data: params,
			})

			credentials.ADVERTISING_ACCESS_TOKEN = response.data.access_token

			return credentials
		} catch (error) {
			throw new Error(`Error on refreshToken: ${error}`)
		}
	}

}
module.exports = SignHelper
