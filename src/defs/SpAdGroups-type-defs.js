// Options
/**
 @typedef CreateAdGroup
 @type {object}
 @property {string} name A name for the ad group.
 @property {number} campaignId An existing campaign to which the ad group is associated.
 @property {number,float} defaultBid A bid value for use when no bid is specified for keywords in the ad group. minimum: 0.02.
 @property {('enabled'|'paused'|'archived')} state The current resource state.
*/
/**
 @typedef UpdateAdGroup
 @type {object}
 @property {number} adGroupId The identifier of the ad group.
 @property {string} name The name of the ad group.
 @property {number,float} defaultBid The bid value used when no bid is specified for keywords in the ad group. minimum: 0.02.
 @property {('enabled'|'paused'|'archived')} state The current resource state.
 */
/**
 @typedef GetAdGroups
 @type {object}
 @property {number} [startIndex=0] 0-indexed record offset for the result set.
 @property {number} [count] Number of records to include in the paged response. Defaults to max page size.
 @property {string} [campaignType='sponsoredProducts'] Restricts results to ad groups within campaign types specified in comma-separated list. Must be: sponsoredProducts
 @property {('enabled' | 'paused' | 'archived' | 'enabled, paused' | 'enabled, archived' | 'paused, archived' | 'enabled, paused, archived')} [stateFilter] Restricts results to resources with state within the specified comma-separated list.
 @property {string} [name] Restricts results to campaigns with the specified name.
 @property {string} [campaignIdFilter] A comma-delimited list of campaign identifiers
 */

// Responses
/**
 @typedef AdGroupResponse
 @type {object}
 @property {number} adGroupId The identifier of the ad group.
 @property {string} code An enumerated success or error code for machine use.
 @property {string} details A human-readable description of the code.
 */
/**
 @typedef AdGroup
 @type {object}
 @property {number} adGroupId The identifier of the ad group.
 @property {string} name The name of the ad group.
 @property {number} campaignId The identifier of the campaign that the ad group is associated with.
 @property {number,float} defaultBid The bid value used when no bid is specified for keywords in the ad group.
 @property {('enabled'|'paused'|'archived')} state The current resource state.
 */
/**
 @typedef AdGroupEx
 @type {object}
 @property {number} adGroupId The identifier of the ad group.
 @property {string} name The name of the ad group.
 @property {number} campaignId The identifier of the campaign that the ad group is associated with.
 @property {number,float} defaultBid The bid value used when no bid is specified for keywords in the ad group.
 @property {('enabled'|'paused'|'archived')} state The current resource state.
 @property {number} creationDate The creation date of the ad group in epoch time.
 @property {number} lastUpdatedDate The date that any value associated with the ad group was last changed, in epoch time.
 @property {('AD_GROUP_ARCHIVED' | 'AD_GROUP_PAUSED' | 'AD_GROUP_STATUS_ENABLED' | 'AD_POLICING_SUSPENDED' | 'AD_GROUP_INCOMPLETE' | 'CAMPAIGN_OUT_OF_BUDGET' | 'CAMPAIGN_PAUSED' | 'CAMPAIGN_ARCHIVED' | 'CAMPAIGN_INCOMPLETE' | 'ACCOUNT_OUT_OF_BUDGET' | 'PENDING_START_DATE')} servingStatus The computed status.
 */
/**
 @typedef AdGroupBidRecommendationsResponse
 @type {Object}
 @property {number} adGroupId The identifier of the ad group.
 @property {SuggestedBid} SuggestedBid parameters
 */
/**
 @typedef SuggestedBid
 @type {Object}
 @property {number} suggested The bid recommendation.
 @property {number} rangeStart The lower bound bid recommendation.
 @property {number} rangeEnd The upper bound bid recommendation.
 */
/**
 @typedef AdGroupSuggestedKeywordsResponse
 @type {Object}
 @property {number} adGroupId The ad group identifier.
 @property {string[]} suggestedKeywords An array of suggested keywords.
 */
/**
 @typedef AdGroupSuggestedKeywordsResponseEx
 @type {Object}
 @property {number} adGroupId The ad group identifier.
 @property {number} campaignId The campaign identifier.
 @property {string} keywordText The suggested keyword.
 @property {('exact'|'phrase'|'broad')} matchType The type of match. For more information
 @property {('enabled'|'paused')} state The state of the ad for which the keyword is suggested.
 @property {number} bid The suggested bid for the suggested keyword. Note that this field will not be included in the response if the suggestBids query parameter is set to no in the request.
 */
