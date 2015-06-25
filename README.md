# done-error

[![Build Status](https://travis-ci.org/evanlucas/done-error.svg)](https://travis-ci.org/evanlucas/done-error)

Verify that done is called with an error.

Useful for verifying that a callback is called with an error
in something like a `mocha` test.

## Install

```bash
$ npm install done-error --save-dev
```

## Usage

```js
var doneError = require('done-error')

function test(cb) {
  cb(new Error('This is an error'))
}

describe('test', function() {
  it('should return an error', function(done) {
    test(doneError(done))
  })
})
```

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
