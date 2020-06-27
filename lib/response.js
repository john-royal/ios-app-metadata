'use strict'

const dayjs = require('dayjs')

class Response {
  constructor (data) {
    this._data = data.results[Object.keys(data.results)[0]]
  }

  /** @returns {string} */
  get appName () {
    return this._data.name
  }

  /** @returns {string} */
  get authorName () {
    return this._data.artistName
  }

  /** @returns {string} */
  get appStoreSubtitle () {
    return this._data.subtitle
  }

  /** @returns {string} */
  get appStoreSlug () {
    const match = this._data.url.match(/(?<=https:\/\/apps.apple.com\/us\/app\/)(?<slug>.+)(?=\/id)/)
    return match.groups.slug
  }

  /** @returns {string} */
  get appStoreDescription () {
    return this._data.description.standard
  }

  /** @returns {string} */
  get appStoreGenres () {
    return this._data.genreNames.join(', ')
  }

  /** @returns {number} */
  get appStoreRatingsAverage () {
    return this._data.userRating.value
  }

  /** @returns {number} */
  get appStoreRatingsTotal () {
    return this._data.userRating.ratingCount
  }

  /** @returns {number} */
  get appStore1StarRatings () {
    return this._data.userRating.ratingCountList[0]
  }

  /** @returns {number} */
  get appStore2StarRatings () {
    return this._data.userRating.ratingCountList[1]
  }

  /** @returns {number} */
  get appStore3StarRatings () {
    return this._data.userRating.ratingCountList[2]
  }

  /** @returns {number} */
  get appStore4StarRatings () {
    return this._data.userRating.ratingCountList[3]
  }

  /** @returns {number} */
  get appStore5StarRatings () {
    return this._data.userRating.ratingCountList[4]
  }

  /** @returns {string} */
  get appStoreChartPosition () {
    const appStoreChartPosition = this._data.chartPositionForStore?.appStore
    if (!appStoreChartPosition) return null
    return `#${appStoreChartPosition.position} (${appStoreChartPosition.genreName})`
  }

  /** @returns {string} */
  get originalReleaseDate () {
    return dayjs(this._data.releaseDate).toDate()
  }

  /** @returns {string} */
  get latestVersionReleaseDate () {
    return dayjs(this._data.latestVersionReleaseDate).toDate()
  }

  /** @returns {string} */
  get supportedLanguages () {
    return this._data.softwareInfo.languagesDisplayString || null
  }

  /** @returns {number} */
  get numberOfSupportedLanguages () {
    if (this._data.softwareInfo.languagesDisplayString) {
      return this._data.softwareInfo.languagesDisplayString.split(', ').length
    }
    return null
  }

  /** @returns {boolean} */
  get hasAppleWatchSupport () {
    return !!this._data.isAppleWatchSupported
  }

  /** @returns {boolean} */
  get hasInAppPurchases () {
    return !!this._data.hasInAppPurchases
  }
}

Response.PROPERTIES = [
  'appName',
  'authorName',
  'latestVersionReleaseDate',
  'appStoreChartPosition',
  'appStoreRatingsAverage',
  'appStoreRatingsTotal',
  'appStore1StarRatings',
  'appStore2StarRatings',
  'appStore3StarRatings',
  'appStore4StarRatings',
  'appStore5StarRatings',
  'numberOfSupportedLanguages',
  'supportedLanguages',
  'hasAppleWatchSupport',
  'hasInAppPurchases',
  'appStoreSubtitle',
  'appStoreSlug',
  'appStoreGenres',
  'originalReleaseDate',
  'appStoreDescription'
]

module.exports = Response
