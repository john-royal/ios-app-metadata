'use strict'

const { readFile } = require('fs/promises')
const xlsx = require('xlsx')

const internals = {}

internals.getAppId = function (urlOrId) {
  const match = urlOrId.match(/(?<id>\d+)$/)
  if (match) {
    return match.groups.id
  }
  throw new Error(`Cannot read app ID from "${urlOrId}"`)
}

exports.readAppIdsFromFile = async function (path) {
  console.log(`Reading app URLs from ${path}`)
  const appList = await readFile(path, { encoding: 'utf8' })
  return appList.split('\n').map(urlOrId => internals.getAppId(urlOrId))
}

exports.writeDataToSpreadsheet = function (path, columns, data) {
  console.log(`Writing output to ${path}`)
  const workbook = xlsx.utils.book_new()
  const sheet = xlsx.utils.json_to_sheet(data, {
    header: columns
  })
  xlsx.utils.book_append_sheet(workbook, sheet, 'Apps')
  return xlsx.writeFile(workbook, path)
}
