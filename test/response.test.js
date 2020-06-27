'use strict'

const test = require('ava')
const dayjs = require('dayjs')
const Response = require('../lib/response')
const { data: { notion: exampleApp } } = require('./fixtures')

const expected = {
  appName: 'Notion - Notes, projects, docs',
  authorName: 'Notion Labs, Incorporated',
  latestVersionReleaseDate: 'June 19, 2020',
  appStoreChartPosition: '#162 (Productivity)',
  appStoreRatingsAverage: 4.1,
  appStoreRatingsTotal: 1346,
  appStore1StarRatings: 156,
  appStore2StarRatings: 89,
  appStore3StarRatings: 94,
  appStore4StarRatings: 128,
  appStore5StarRatings: 879,
  numberOfSupportedLanguages: 1,
  supportedLanguages: 'English',
  hasAppleWatchSupport: false,
  hasInAppPurchases: false,
  appStoreSubtitle: 'The all-in-one workspace',
  appStoreSlug: 'notion-notes-projects-docs',
  appStoreGenres: 'Productivity, Business',
  originalReleaseDate: 'September 14, 2017',
  appStoreDescription: 'Notion is the all-in-one workspace for your notes, tasks, wikis, and databases.\n\n** Apple App of the Day **\n** WSJ columnist reviews: "a rare renaissance app," "I used to need five separate apps... now it’s all in Notion"\n**A Product Hunt favorite with 3k+ up-votes. It\u0027s the perfect pairing to the desktop app that was nominated for app of the year.\n\nDRAG, DROP, EDIT\nUse drag \u0026 drop and Force Touch to arrange any content. Great for prioritizing lists and to-dos.\n\nRICH MEDIA\nSupports images, to-dos, bookmarks, code snippets and 20+ block types.\n\nSYNC WITH MAC, WINDOWS, AND BROWSER\nDownload the companion browser and desktop apps. Notion keeps everything in sync.\n\nOFFLINE\nPages you visit online are downloaded for access on the go.\n\nCOLLABORATE IN REAL-TIME\nShare your pages, and edit together at the same time, @mention, and comments.\n\nFOLDERLESS ORGANIZATION\nOrganize your content using nested pages. Say goodbye to messy folders.'
}

for (const [name, expectedValue] of Object.entries(expected)) {
  test(name, t => {
    const response = new Response(exampleApp.apiResponse)
    const actualValue = response[name]
    if (name.endsWith('Date')) {
      t.true(dayjs(actualValue).isSame(expectedValue))
    } else {
      t.is(actualValue, expectedValue)
    }
  })
}
