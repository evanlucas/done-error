module.exports = function(done, msg) {
  return function(err) {
    if (!(err instanceof Error)) {
      var type = getType(err)
      return done && done(new Error('Expected Error but got ' + type))
    }

    if (msg) {
      if (msg instanceof RegExp) {
        if (!msg.test(err.message)) {
          var exp = msg.toString()
          return done && done(new Error('Match: ' + exp + ' Actual: ' +
            err.message))
        }
        return done && done()
      }
      if (msg !== err.message) {
        return done && done(new Error('Expected: ' + msg + ' Actual: ' +
          err.message))
      }
    }

    done && done()
  }
}

function getType(err) {
  if (err === null)
    return 'null'

  if (isPrimitive(err))
    return typeof err

  if (err.constructor.name === 'Object') return 'object'
  return err.constructor.name
}

function isPrimitive(arg) {
  return arg === null
    || typeof arg !== 'object'
    && typeof arg !== 'function'
}
