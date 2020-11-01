const jsonfile = require('jsonfile')
const fs = require('fs-extra')
const path = require('path')
const rootPath = require('app-root-path').path
// eslint-disable-next-line import/no-dynamic-require
const AmzAdsApi = require(path.join(rootPath, 'src'));

(async () => {
	console.log(`Initiating values`)
	const dumpFolder = path.join('tests', 'dump', 'sp', 'adGroups')
	fs.ensureDirSync(dumpFolder)
	// let response = ''

	const date = new Date()
	const year = date.getFullYear().toString()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString()
		.padStart(2, '0')
	const formattedDate = year + month + day
	console.log(`Getting test config`)
	const config = jsonfile.readFileSync(path.join(rootPath, 'tests', 'config.test.json'))
	console.log(`Creating AmzAdsApi and getting profile`)
	const countryCode = 'US'
	const amzAdsApi = new AmzAdsApi(config.CREDENTIALS)
	const profilesList = await amzAdsApi.Profiles.listProfiles()
	const profileSellerList = profilesList.filter((profile) => profile.accountInfo.type === 'seller' && profile.countryCode === countryCode)
	const profileId = profileSellerList[0].profileId
	// Testing api module
	// let response = await amzAdsApi.SpCampaigns.getCampaigns('573128773140931')
	console.log(`Testing module from profile id ${profileId}`)
	console.log('Creating a temp campaign')
	let options = [
		{
			name: `test_campaign_${date.getTime()}`,
			campaignType: 'sponsoredProducts',
			targetingType: 'manual',
			state: 'enabled',
			dailyBudget: 1,
			startDate: formattedDate,
			endDate: '20251020',
			bidding: {
				strategy: 'legacyForSales',
				adjustments: [
					{
						predicate: 'placementTop',
						percentage: 0,
					}, {
						predicate: 'placementProductPage',
						percentage: 0,
					},
				],
			},
		},
	]
	const campaignId = await amzAdsApi.SpCampaigns.createCampaigns(profileId, options)
	console.log('Campaign id: ', campaignId)

	console.log(`Creating a test adGroup`)
	const adGroupName = `test_adGroup_${date.getTime()}`
	options = [
		{
			name: adGroupName,
			campaignId,
			defaultBid: 1,
			state: 'enabled',
		},
	]
	const adGroupId = await amzAdsApi.SpAdGroups.crea
	console.log('AdGroup id: ', adGroupId)
	console.log(`Updating`)
	response = await amzAdsApi.SpAdGroups.updateAdGroups(profileId, [
		{
			adGroupId, name: `${adGroupName}_edited`,
		},
	])
	console.log(response)
	console.log(`Getting info`)
	const adGroupInfo = await amzAdsApi.SpAdGroups.getAdGroup(profileId, adGroupId, true)
	console.log(adGroupInfo)

	console.log(`Getting list`)
	const adGroupsList = await amzAdsApi.SpAdGroups.getAdGroups(profileId, {}, true)
	jsonfile.writeFileSync(path.join(dumpFolder, `adGroups_${profileId}.json`), adGroupsList, { spaces: 2 })

	console.log(`Archiving adGroup`)
	response = await amzAdsApi.SpAdGroups(profileId, adGroupId)
	console.log(response)
	console.log(`Archiving testing campaign`)
	response = await amzAdsApi.SpCampaigns.archiveCampaign(campaignId, profileId)
	console.log(response)

	console.log('All tests passed')
})()
