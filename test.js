var test = require('tap').test
  , lib = require('./')

test('should work for errors', function(t) {
  t.plan(1)
  var e = new Error('Test')
  helper(e)(function(err) {
    t.equal(err, undefined, 'no error should be passed')
  })
})

test('should fail for primitives', function(t) {
  t.plan(6)
  helper(false)(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got boolean')
  })

  helper(1)(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got number')
  })

  helper('1')(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got string')
  })
})

test('should fail for objects', function(t) {
  helper({})(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got object')
  })

  function Blah() {}
  var blah = new Blah()
  helper(blah)(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got Blah')
  })

  helper([])(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got Array')
  })

  helper(Blah)(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got Function')
  })
})

function helper(arg) {
  return function(cb) {
    lib(cb)(arg)
  }
}
