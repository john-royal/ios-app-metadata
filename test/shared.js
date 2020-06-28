'use strict'

const { join } = require('path')
const { mkdtemp, rmdir } = require('fs/promises')
const xlsx = require('xlsx')

/**
 * Creates a temporary directory in which to make a test file,
 * returns the path for the test file you're creating,
 * and registers a teardown function that deletes the directory
 * when the test is complete.
 * @param {import('ava').ExecutionContext} t
 * @param {string} filename
 */
exports.createTempFilePath = async function (t, filename) {
  const prefix = join(__dirname, '/.tmp-')
  const dirname = await mkdtemp(prefix)
  t.teardown(() => {
    return rmdir(dirname, { recursive: true })
  })
  return join(dirname, filename)
}

/**
 * Read an Excel file at the given path and return the file data in CSV format.
 * @param {string} path
 */
exports.getStringFromExcelFilePath = function (path) {
  const workbook = xlsx.readFile(path)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  return xlsx.utils.sheet_to_csv(sheet)
}
