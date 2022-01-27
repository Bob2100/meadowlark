const Browser = require('zombie')
const assert = require('chai').assert
let browser = null
suite('Cross-page Tests', function () {
  setup(function () {
    browser = new Browser()
  })
  test('requesting a group rate quote from the hood river page should populate the referrer field', function (done) {
    const referrer = 'http://localhost:3000/tours/hood-river'
  })
})
