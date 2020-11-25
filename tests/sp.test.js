const jsonfile = require('jsonfile')
const fs = require('fs-extra')
const path = require('path')
const rootPath = require('app-root-path').path
const AmzAdsApi = require('../src');

(async () => {
	let dumpFolder = ''
	const date = new Date()
	const config = jsonfile.readFileSync(path.join(rootPath, 'tests', 'config.test.json'))
	const amzAdsApi = new AmzAdsApi(config.CREDENTIALS)
	const profilesList = jsonfile.readFileSync(path.join(
		rootPath, 'tests', 'dump', 'profiles', 'listProfiles.json',
	))
	const profileSellerList = profilesList.filter((profile) => profile.accountInfo.type === 'seller')
	// for (let i = 0; i < profileSellerList.length; i += 1) {
	const profile = profileSellerList[1]
	console.log(`Testing from profile id ${profile.profileId}`)
	amzAdsApi.SpAdGroups.createAdGroups('1111', { name: '1' })
	// console.log(`Creating a test campaign`)
	// const campaignOptions = [
	// 	{
	// 		name: `test_campaign_${date.getTime()}`,
	// 		campaignType: 'sponsoredProducts',
	// 		targetingType: 'manual',
	// 		state: 'enabled',
	// 		dailyBudget: 1,
	// 		startDate: '20201027',
	// 		endDate: '20251020',
	// 		bidding: {
	// 			strategy: 'legacyForSales',
	// 			adjustments: [
	// 				{
	// 					predicate: 'placementTop',
	// 					percentage: 0,
	// 				}, {
	// 					predicate: 'placementProductPage',
	// 					percentage: 0,
	// 				},
	// 			],
	// 		},
	// 	},
	// ]
	// const campaignId = await amzAdsApi.SpCampaigns.createCampaigns(campaignOptions, profile.profileId)
	// console.log('Campaign id: ', campaignId)
	// console.log(`Updating the recently created campaign`)
	// const updateCampaignOptions = [
	// 	{
	// 		campaignId,
	// 		name: 'campaign_edited4211',
	// 	},
	// ]
	// await amzAdsApi.SpCampaigns
	// 	.updateCampaigns(updateCampaignOptions, profile.profileId)
	// console.log(`Getting a campaign info`)
	// const campaignInfoExtended = await amzAdsApi.SpCampaigns.getCampaign(campaignId, profile.profileId, true)
	// dumpFolder = path.join(
	// 	rootPath, 'tests', 'dump', 'sp', 'campaigns',
	// )
	// fs.ensureDirSync(dumpFolder)
	// jsonfile.writeFileSync(path.join(dumpFolder, `campaign_${profile.profileId}.json`), campaignInfoExtended, { spaces: 2 })
	// console.log(`Getting campaigns list`)
	// const campaignList = await amzAdsApi.SpCampaigns.listCampaigns(profile.profileId)
	// jsonfile.writeFileSync(path.join(dumpFolder, `campaigns_${profile.profileId}.json`), campaignList, { spaces: 2 })
	// console.log(`Archiving the recently created campaign`)
	// await amzAdsApi.SpCampaigns.archiveCampaign(campaignId, profile.profileId)
	// console.log(`Creating a test adGroup`)
	// const adGroupOptions = [
	// 	{
	// 		name: `test_adGroup_${date.getTime()}`,
	// 		campaignId,
	// 		defaultBid: 1,
	// 		state: 'enabled',
	// 	},
	// ]
	// const adGroupId = await amzAdsApi.SpAdGroups.createAdGroups(adGroupOptions, profile.profileId)
	// console.log('AdGroup id: ', adGroupId)
	console.log(`Getting adGroups`)
	const listAdGroupsOptions = {
		count: 10, stateFilter: 'enabled',
	}
	const adGroupList = await amzAdsApi.SpAdGroups.getAdGroups(profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'adGroups')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `adGroups_${profile.profileId}.json`), adGroupList, { spaces: 2 })

	console.log(`Creating a product ads`)
	const productAdsOptions = [
		{
			campaignId,
			adGroupId,
			sku: config.SKU,
			state: 'enabled',
		},
	]
	const productAdsId = await amzAdsApi.SpProductAds.createProductAds(productAdsOptions, profile.profileId)

	console.log(`Getting product ads list`)
	const listProductAds = await amzAdsApi.SpProductAds.listProductsAds(profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'productAds')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `listProductAds_${profile.profileId}.json`), listProductAds, { spaces: 2 })

	console.log(`Creating a keyword`)
	const keywordsOptions = [
		{
			campaignId,
			adGroupId,
			state: 'enabled',
			keywordText: 'testing keyword',
			matchType: 'exact',
			bid: 1,
		},
	]
	const keywordId = await amzAdsApi.SpKeywords.createKeywords(keywordsOptions, profile.profileId)

	console.log(`Getting keywords list`)
	const listKeywords = await amzAdsApi.SpKeywords.listKeywords(profile.profileId)
	jsonfile.writeFileSync(path.join(dumpFolder, `listKeywords_${profile.profileId}.json`), listKeywords, { spaces: 2 })

	const autoEnabledCampaignList = campaignList
		.filter((campaign) => campaign.targetingType === 'auto' && campaign.state === 'enabled')
	const manualEnabledCampaignList = campaignList
		.filter((campaign) => campaign.targetingType === 'manual' && campaign.state === 'enabled')
	const adGroupAutoCampaignId = adGroupList
		.filter((adGroup) => adGroup.campaignId === autoEnabledCampaignList[0].campaignId)[0].adGroupId
	const adGroupManualCampaignId = adGroupList
		.filter((adGroup) => adGroup.campaignId === manualEnabledCampaignList[0].campaignId)[0].adGroupId

	console.log(`Getting adGroups bid recommendations`)
	const adGroupBidRecommendations = await amzAdsApi.SpAdGroups
		.getBidRecommentations(adGroupAutoCampaignId, profile.profileId)
	jsonfile.writeFileSync(path.join(dumpFolder, `adGroupBidRecommendations_${adGroupAutoCampaignId}.json`), adGroupBidRecommendations, { spaces: 2 })

	console.log(`Getting keywords bid recommendations`)
	const keywordsToGetRecommendations = [
		{
			keyword: 'baking mat',
			matchType: 'exact',
		},
	]
	const keywordsBidRecommendations = await amzAdsApi.SpKeywords
		.getBidRecommendations(adGroupManualCampaignId, keywordsToGetRecommendations, profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'keywords')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `keywordBidRecommendations_${profile.profileId}.json`), keywordsBidRecommendations, { spaces: 2 })

	console.log(`Getting negative keywords list`)
	const listNegativeKeywords = await amzAdsApi.SpNegativeKeywords.listNegativeKeywords(profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'negativeKeywords')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `listNegativeKeywords_${profile.profileId}.json`), listNegativeKeywords, { spaces: 2 })

	console.log(`Getting campaigns negative keywords list`)
	const listCampaignNegativeKeywords = await amzAdsApi.SpCampaignNegativeKeywords
		.listCampaignNegativeKeywords(profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'campaignNegativeKeywords')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `listCampaignNegativeKeywords_${profile.profileId}.json`), listCampaignNegativeKeywords, { spaces: 2 })

	console.log(`Getting suggested keywords by Asins`)
	const asinSuggestedKeywords = await amzAdsApi.SpAsins
		.getSuggestedKeywords(config.ASIN, profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'asins')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `asinSuggestedKeywords_${profile.profileId}_${config.ASIN}.json`), asinSuggestedKeywords, { spaces: 2 })

	console.log(`Getting targets list`)
	const listTargets = await amzAdsApi.SpTargetAds.listTargets(profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'targets')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `listTargets_${profile.profileId}.json`), listTargets, { spaces: 2 })

	console.log(`Getting negative targets list`)
	const listNegativeTargets = await amzAdsApi.SpNegativeTargets.listNegativeTargets(profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'negativeTargets')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `listNegativeTargets_${profile.profileId}.json`), listNegativeTargets, { spaces: 2 })

	console.log(`Getting keywords reports`)
	const reportOptions = {
		segment: 'query',
		reportDate: '20200930',
		metrics: 'impressions,clicks',
	}
	const reportData = await amzAdsApi.SpReports.processReport('keywords', reportOptions, profile.profileId)
	dumpFolder = path.join('tests', 'dump', 'sp', 'reports')
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `reports_${profile.profileId}.json`), reportData, { spaces: 2 })

	console.log(`Getting snapshot reports`)
	const snapshotOptions = { stateFilter: 'enabled' }
	const snapshotData = await amzAdsApi.SpSnapshots.processSnapshot('campaigns', snapshotOptions, profile.profileId)
	dumpFolder = path.join(
		rootPath, 'tests', 'dump', 'sp', 'snapshots',
	)
	fs.ensureDirSync(dumpFolder)
	jsonfile.writeFileSync(path.join(dumpFolder, `snapshots_${profile.profileId}.json`), snapshotData, { spaces: 2 })
	// }
	console.log('All tests passed')
})()
