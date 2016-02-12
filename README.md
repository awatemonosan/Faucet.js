Faucet
=========

An ES6 emitter class

## Installation

  npm install faucet --save

## Usage

  var Faucet = require('faucet');
  
  var emitter = new Faucet();
  emitter.on('test',function(){
    console.log('it works');
  });

  emitter.trigger('test');

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release