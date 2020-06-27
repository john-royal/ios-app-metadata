'use strict'

const test = require('ava')
const sinon = require('sinon')
const Request = require('../lib/request')
const { data: { notes: exampleApp } } = require('./fixtures')
const Response = require('../lib/response')

test.beforeEach(t => {
  const json = sinon.stub().resolves(exampleApp.apiResponse)
  const fetch = sinon.stub().resolves({ json })
  t.context.json = json
  t.context.fetch = fetch
  t.context.request = Request(fetch)
})

test.afterEach.always(t => {
  t.context.json = null
  t.context.fetch = null
  t.context.request = null
})

test('sends request to correct URL', async t => {
  await t.context.request(exampleApp.id)
  t.true(t.context.fetch.calledOnceWithExactly(exampleApp.apiRequestUrl))
})

test('parses response JSON', async t => {
  await t.context.request(exampleApp.id)
  t.true(t.context.json.calledOnceWithExactly(/* no parameters */))
})

test('returns Response object', async t => {
  t.plan(2)
  const expected = new Response(exampleApp.apiResponse)
  const actual = await t.context.request(exampleApp.id)
  t.true(actual instanceof Response)
  t.deepEqual(actual, expected)
})
