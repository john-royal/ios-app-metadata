'use strict'

const io = require('./io')
const Request = require('./request')

const internals = {
  spreadsheetColumnNames: {
    appName: 'App Name',
    authorName: 'Author',
    latestVersionReleaseDate: 'Latest Version Release Date',
    appStoreChartPosition: 'App Store Chart Position',
    appStoreRatingsAverage: 'Rating Average',
    appStoreRatingsTotal: 'Total Ratings',
    appStore1StarRatings: '1-Star Ratings',
    appStore2StarRatings: '2-Star Ratings',
    appStore3StarRatings: '3-Star Ratings',
    appStore4StarRatings: '4-Star Ratings',
    appStore5StarRatings: '5-Star Ratings',
    numberOfSupportedLanguages: 'Number of Supported Languages',
    supportedLanguages: 'Supported Languages',
    hasAppleWatchSupport: 'Apple Watch Support?',
    hasInAppPurchases: 'In-App Purchases?',
    appStoreSubtitle: 'App Store Subtitle',
    appStoreSlug: 'App Store Slug',
    appStoreGenres: 'App Store Genres',
    originalReleaseDate: 'Original Release Date',
    appStoreDescription: 'App Store Description'
  }
}

internals.formatOutputProperties = function (allAppMetadataOriginal) {
  return allAppMetadataOriginal.map(appMetadataOriginal => {
    const appMetadataFormatted = {}
    for (const [propertyName, columnName] of Object.entries(internals.spreadsheetColumnNames)) {
      appMetadataFormatted[columnName] = appMetadataOriginal[propertyName]
    }
    return appMetadataFormatted
  })
}

internals.writeOutputsToFile = function (outputPath, allAppMetadataOriginal) {
  const allAppMetadataFormatted = internals.formatOutputProperties(allAppMetadataOriginal)
  return io.writeDataToSpreadsheet(outputPath, Object.values(internals.spreadsheetColumnNames), allAppMetadataFormatted)
}

module.exports = async function (inputPath, outputPath, fetch) {
  const appIds = await io.readAppIdsFromFile(inputPath)

  console.log(`About to find metadata for ${appIds.length} apps`)
  const requestAppMetadata = Request(fetch)
  const allAppMetadata = await Promise.all(appIds.map(requestAppMetadata))

  await internals.writeOutputsToFile(outputPath, allAppMetadata)
}
