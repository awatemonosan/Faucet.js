Pidgey
=========

An ES7 emitter class utilizing promises

## Installation

  npm install pidgey --save

## Usages

To import the emitter class:
```javascript
var Pidgey = require('pidgey');
```

To create an emitter:
```javascript
var emitter = new Pidgey();
```

Once you have an emitter you can add a callback like this:
```javascript
emitter.on('example', function(){
  console.log("example has been triggered");
}
```

...And you can trigger them like this:
```javascript
emitter.trigger('example');
// "example has been triggered"
```

You can pass arguments to trigger:
```javascript
emitter.on('example2', function(resolve, reject, argument){
  // I will explain resolve and reject further in this document
  console.log("example2 has been triggered with '" + argument + "'");
}
emitter.trigger('example2', "test");
// "example2 has been triggered with 'test'"
```

If you want some code to run only after every trigger was successful:
```javascript
emitter.on('example3', function(resolve, reject){
  console.log("example3 has been triggered with and is being IMPLICITLY resolved");
});
emitter.trigger('example3').then(function(){
  console.log("all callbacks were successful");
});
// "example3 has been triggered with and is being implicitly resolved"
// "all callbacks were successful"

emitter.on('example3', function(resolve, reject){
  console.log("example3 has been triggered with and is being EXPLICITLY resolved");
  resolve();
});
emitter.trigger('example3').then(function(){
  console.log("all callbacks were successful");
});
// "example3 has been triggered with and is being implicitly resolved"
// "example3 has been triggered with and is being EXPLICITLY resolved"
// "all callbacks were successful"

emitter.on('example3', function(resolve, reject){
  console.log("example3 has been triggered with and is being EXPLICITLY rejected");
  reject();
});
emitter.trigger('example3').then(function(){
  console.log("all callbacks were successful");
});
// "example3 has been triggered with and is being implicitly resolved"
// "example3 has been triggered with and is being EXPLICITLY resolved"
// "example3 has been triggered with and is being EXPLICITLY rejected"
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
* 0.1.8 Fixes. Made triggers return promises correctly. Add more test
* 0.1.9 Fixed trigger to use a Promise.race instead of a Promise.all
* 0.1.10 Bug fixes