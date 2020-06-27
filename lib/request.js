'use strict'

const Response = require('./response')

const internals = {
  // This url may change from time to time.
  // See https://developer.apple.com/documentation/devicemanagement/service_configuration for more information.
  CONTENT_METADATA_LOOKUP_URL: 'https://uclient-api.itunes.apple.com/WebObjects/MZStorePlatform.woa/wa/lookup'
}

internals.formatRequestUrl = function (id) {
  return `${internals.CONTENT_METADATA_LOOKUP_URL}?version=2&id=${id}&p=mdm-lockup&caller=MDM&cc=us&l=en`
}

module.exports = function (fetch) {
  return async function (id) {
    const url = internals.formatRequestUrl(id)
    /** @type {import('node-fetch').Response} */
    const response = await fetch(url)
    const data = await response.json()
    return new Response(data)
  }
}
