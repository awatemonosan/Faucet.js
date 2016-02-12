'use strict'

const Faucet = class {
  constructor(){
    this.callbacks = {};
    this.callbackRefs = [];
  }

  triggerDelay(event, msg, delay){
    var that = this;
    setTimeout(function(){
      that.trigger(msg)
    }, delay);
  }

  trigger(event){
    var args = Array.prototype.slice.call(arguments,1);
    return new Promise(function(resolve, reject){
      var allCallbacks = this.callbacks.all || [];
      var eventCallbacks = this.callbacks[event] || [];
      var callbacks = allCallbacks.concat(eventCallbacks);

      args = [resolve, reject].concat(args);

      callbacks.forEach(function(callback){
        if(callback===null) return;
        callback.apply(this, args);
      });
    });
  }

  on(event, callback){
    this.callbacks[event] = this.callbacks[event] || [];

    var callbackRefID = this.callbackRefs.length;
    var bucketID = this.callbacks[event].length;

    this.callbacks[event].push(callback);
    this.callbackRefs.push({event: event, id: bucketID});
  }

  once(event, callback){
    var that = this;
    return (function(){
      var refID = that.on(event, function(){
        that.off(refID);
        callback.apply(that, arguments);
      });
      return refID;
    })(); 
  }

  off(id_or_event){
    if(this.callbackRefs[id_or_event] !== undefined){
      var id = id_or_event;

      var bucket = this.callbackRefs[id];
      this.callbacks[bucket.event][bucket.id] = null;
    }
  }

  count(event){
    if(this.callbacks[event] === undefined) return 0;

    var count = 0;
    this.callbacks[event].forEach(function(callback){
      if(callback === null) return;
      count++;
    });

    return count;
  }
};

module.exports = Faucet;