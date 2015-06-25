module.exports = function(done) {
  return function(err) {
    if (!(err instanceof Error)) {
      var type = getType(err)
      return done && done(new Error('Expected Error but got ' + type))
    }

    done && done()
  }
}

function getType(err) {
  if (err === null)
    return 'null'

  if (isPrimitive(err))
    return typeof err

  if (err.constructor) {
    if (err.constructor.name === 'Object') return 'object'
    return err.constructor.name
  }

  return err
}

function isPrimitive(arg) {
  return arg === null
    || typeof arg !== 'object'
    && typeof arg !== 'function'
}
