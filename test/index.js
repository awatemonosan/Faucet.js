var should = require('chai').should();

var Pidgey = require('../index');

describe('#Pidgey', function() {

  describe('.on', function() {
    it('registers a callback', function() {
      emitter = new Pidgey();
      emitter.count('test').should.equal(0);
      emitter.on('test',function(){});
      emitter.count('test').should.equal(1);
    });
  });

  describe('.trigger', function() {
    it('calls a callback', function() {
      emitter = new Pidgey();
      emitter.on('good_event',function(resolve, reject){
        resolve();
      });
      emitter.on('bad_event',function(resolve, reject){
        reject();
      });
      emitter.trigger('good_event').catch(function(){
        throw 'good_event should resolve';
      });
      emitter.trigger('bad_event').then(function(){
        throw 'bad_event should reject';
      });
    });

    it('passes arguments', function(){
      emitter = new Pidgey();
      emitter.on('event', function(resolve, reject){
        resolve();
      });
      emitter.trigger('event', "test", 2).then( function(arg1, arg2){
        arg1.should.equal("test");
        arg2.should.equal(2);
      }).catch(function(){
        throw 'event should resolve';
      });
    });
  });

});
