const Profiles = require('./model/Profiles.js')
const SpCampaigns = require('./model/SpCampaigns.js')
const SpAdGroups = require('./model/SpAdGroups.js')
const SpCampaignNegativeKeywords = require('./model/SpCampaignNegativeKeywords.js')
const SpAsins = require('./model/SpAsins.js')
const SpKeywords = require('./model/SpKeywords.js')
const SpNegativeKeywords = require('./model/SpNegativeKeywords.js')
const SpNegativeTargets = require('./model/SpNegativeTargets.js')
const SpProductAds = require('./model/SpProductAds.js')
const SpTargets = require('./model/SpTargets.js')
const SpReports = require('./model/SpReports.js')
const SpSnapshots = require('./model/SpSnapshots.js')

function newApi(credentials) {
	this.Profiles = new Profiles(credentials)
	// Sponsored Products
	this.SpCampaigns = new SpCampaigns(credentials)
	this.SpAdGroups = new SpAdGroups(credentials)
	this.SpKeywords = new SpKeywords(credentials)
	this.SpNegativeKeywords = new SpNegativeKeywords(credentials)
	this.SpCampaignNegativeKeywords = new SpCampaignNegativeKeywords(credentials)
	this.SpAsins = new SpAsins(credentials)
	this.SpProductAds = new SpProductAds(credentials)
	this.SpTargets = new SpTargets(credentials)
	this.SpNegativeTargets = new SpNegativeTargets(credentials)
	this.SpReports = new SpReports(credentials)
	this.SpSnapshots = new SpSnapshots(credentials)
}

module.exports = newApi
