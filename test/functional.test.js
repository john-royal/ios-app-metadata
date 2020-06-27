'use strict'

const test = require('ava')
const sinon = require('sinon')
const getAppStoreMetadata = require('../lib')
const { data, Paths } = require('./fixtures')
const { createTempFilePath, getStringFromExcelFilePath } = require('./shared')

const createFetchStub = () => {
  const fetchStub = sinon.stub()
  for (const { apiRequestUrl, apiResponse } of Object.values(data)) {
    const response = {
      json () {
        return apiResponse
      }
    }
    fetchStub.withArgs(apiRequestUrl).returns(response)
  }
  return fetchStub
}

test('reads app IDs, retrieves metadata from app store, and writes to xlsx file', async t => {
  const outputFilePath = await createTempFilePath(t, 'output.xlsx')
  const fetchStub = createFetchStub()
  await getAppStoreMetadata(Paths.APPS_VALID, outputFilePath, fetchStub)
  const actual = getStringFromExcelFilePath(outputFilePath)
  const expected = getStringFromExcelFilePath(Paths.OUTPUT_SPREADSHEET)
  t.is(actual, expected)
})
