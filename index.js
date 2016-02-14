'use strict'

const Pidgey = class {
  constructor(){
    this.callbacks = {};
    this.callbackRefs = [];
  }

  triggerDelay(event, msg, delay){
    return new Promise(function(resolve, reject){
      var that = this;
      setTimeout(function(){
        that.trigger(msg).then(resolve).catch(reject);
      }, delay);
    });
  }

  trigger(event){
    var allCallbacks = this.callbacks.all || [];
    var eventCallbacks = this.callbacks[event] || [];
    var callbacks = allCallbacks.concat(eventCallbacks);

    var args = Array.prototype.slice.call(arguments,1);

    var that = this;
    var promises = callbacks.map(function(callback){
      return new Promise(function(resolve, reject){
        if(callback === null) return;
        var rejected = false;
        var rejectWrapper = function(){
          rejected = true;
        };
        var combinedArgs = [resolve, reject].concat(args);
        callback.callback.apply(that, combinedArgs);
      });
    });

    // push a timeout promise to close this incase nothing else does
    // promises.push(new Promise(function(resolve, reject){
    //   setTimeout(reject, 30*1000);
    // }));

    return Promise.race(promises);
  }

  on(event, callback){
    this.callbacks[event] = this.callbacks[event] || [];

    var callbackRefID = this.callbackRefs.length;
    var bucketID = this.callbacks[event].length; // TODO: refactor this out

    this.callbacks[event].push(callback);

    this.callbackRefs.push({
      event: event,
      id: bucketID
    });

    return callbackRefID;
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

module.exports = Pidgey;