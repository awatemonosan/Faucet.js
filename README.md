Pidgey
=========

An ES6 emitter class

## Installation

  npm install pidgey --save

## Usage

```javascript
var Pidgey = require('pidgey');

var emitter = new Pidgey();
emitter.on('test',function(resolve, reject, message){
  console.log('it works');
  resolve(message);
});

emitter.trigger('test')
.then(function(){
  console.log(message);
});

emitter.trigger('test', 'awesome');
// should output:
// 'it works'
// 'awesome'
```

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
* 0.1.1 Readme fix, better usage example
* 0.1.2 Better Readme formatting