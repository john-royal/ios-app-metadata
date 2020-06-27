'use strict'

const { join } = require('path')

exports.data = require('./data.json')

exports.Paths = {
  APPS_INVALID: join(__dirname, 'invalid-apps.txt'),
  APPS_VALID: join(__dirname, 'valid-apps.txt'),
  EXAMPLE_SPREADSHEET: join(__dirname, 'spreadsheet.xlsx'),
  OUTPUT_SPREADSHEET: join(__dirname, 'output.xlsx')
}
