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
  t.plan(8)
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

  helper(null)(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected Error but got null')
  })
})

test('should fail for objects', function(t) {
  t.plan(8)
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

test('should work with optional message', function(t) {
  t.plan(3)
  var err = new Error('Error message')
  helper(err, 'Error message')(function(err) {
    t.equal(err, undefined)
  })

  helper(err, 'ERR')(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Expected: ERR Actual: Error message')
  })
})

test('should work when optional message is a RegExp', function(t) {
  t.plan(3)
  var err = new Error('Error message')
  helper(err, /Error message/)(function(err) {
    t.equal(err, undefined)
  })

  helper(err, /ERR/)(function(err) {
    t.equal(err instanceof Error, true, 'err should be an error')
    t.equal(err.message, 'Match: /ERR/ Actual: Error message')
  })
})

function helper(arg, msg) {
  return function(cb) {
    lib(cb, msg)(arg)
  }
}
