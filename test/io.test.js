'use strict'

const test = require('ava')
const io = require('../lib/io')
const { createTempFilePath, getStringFromExcelFilePath } = require('./shared')
const { Paths } = require('./fixtures')

test('gets app IDs from file', async t => {
  const appIds = await io.readAppIdsFromFile(Paths.APPS_VALID)
  t.deepEqual(appIds, [
    '1016366447',
    '1110145109',
    '1232780281',
    '289429962'
  ])
})

test('throws if given an invalid string', t => {
  return t.throwsAsync(() => {
    return io.readAppIdsFromFile(Paths.APPS_INVALID)
  }, { message: 'Cannot read app ID from "https://apps.apple.com/us/app/"' })
})

test('writes data to xlsx file', async t => {
  const path = await createTempFilePath(t, 'file.xlsx')
  await io.writeDataToSpreadsheet(path, ['name', 'id', 'url'], [
    { name: 'Apple Notes', id: '1110145109', url: 'https://apps.apple.com/us/app/notes/id1110145109' },
    { name: 'Bear', id: '1016366447', url: 'https://apps.apple.com/us/app/bear/id1016366447' },
    { name: 'Notion', id: '1232780281', url: 'https://apps.apple.com/us/app/notion-notes-projects-docs/id1232780281' },
    { name: 'Simplenote', id: '289429962', url: 'https://apps.apple.com/us/app/simplenote/id289429962' }
  ])
  const actual = getStringFromExcelFilePath(path)
  const expected = getStringFromExcelFilePath(Paths.EXAMPLE_SPREADSHEET)
  t.is(actual, expected)
})
