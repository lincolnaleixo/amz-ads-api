const jsonfile = require('jsonfile')
const fs = require('fs-extra')
const path = require('path')
const Profiles = require('../src/model/Profiles');

(async () => {
	const config = jsonfile.readFileSync('./tests/config.test.json')
	const dumpFolder = path.join('tests', 'dump', 'profiles')
	fs.ensureDirSync(dumpFolder)

	const profiles = new Profiles(config.CREDENTIALS)
	const profilesList = await profiles.listProfiles()
	jsonfile.writeFileSync(path.join(dumpFolder, 'listProfiles.json'), profilesList, { spaces: 2 })

	const profileSellerList = profilesList.filter((profile) => profile.accountInfo.type === 'seller')
	for (let i = 0; i < profileSellerList.length; i += 1) {
		const profile = profileSellerList[i]
		const managedAccount = await profiles.listManagerAccounts(profile.profileId)
		jsonfile.writeFileSync(path.join(dumpFolder, `managedAccount_${profile.profileId}.json`), managedAccount, { spaces: 2 })
	}
})()
