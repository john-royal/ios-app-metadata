#!usr/bin/env/node
'use strict'

const fetch = require('node-fetch')
const { join } = require('path')
const getAppStoreMetadata = require('../lib')

const internals = {
  INPUT_FILE_PATH: join(__dirname, '../', 'apps.txt'),
  OUTPUT_FILE_PATH: join(__dirname, '../', `output-${Date.now()}.xlsx`)
}

internals.run = async function () {
  console.log('iOS App Metadata Finder\n')
  await getAppStoreMetadata(internals.INPUT_FILE_PATH, internals.OUTPUT_FILE_PATH, fetch)
  console.log('Done')
}

if (require.main === module) {
  // Run script
  internals.run()
}
