var async = require('async');

function captainHook(schema) {

  // Pre-Save Setup
  schema.pre('save', function (next) {
    var self = this;
    this._wasNew = this.isNew;
    if (this.isNew) {
      this.runPreCreate(self, function(){
        next();
      });
    } else {
      this.runPreUpdate(self, function(){
        next();
      });
    }
  });

  // Post-Save Setup
  schema.post('save', function () {
    var self = this;
    if (this._wasNew) {
      this.runPostCreate(self);
    } else {
      this.runPostUpdate(self);
    }
  });

  // Pre-Create Methods
  schema.preCreateMethods = [];

  schema.preCreate = function(fn){
    schema.preCreateMethods.push(fn);
  };

  schema.methods.runPreCreate = function(self, callback){
    async.eachSeries(schema.preCreateMethods,
      function(fn, cb) {
        fn(self, cb);
      }, function(err){
        if (err){ throw err; }
        callback();
    });
  };

  // Pre-Update Methods
  schema.preUpdateMethods = [];

  schema.preUpdate = function(fn){
    schema.preUpdateMethods.push(fn);
  };

  schema.methods.runPreUpdate = function(self, callback){
    async.eachSeries(schema.preUpdateMethods,
      function(fn, cb) {
        fn(self, cb);
      }, function(err){
        if (err){ throw err; }
        callback();
    });
  };

  // Post-Create Methods
  schema.postCreateMethods = [];

  schema.postCreate = function(fn){
    schema.postCreateMethods.push(fn);
  };

  schema.methods.runPostCreate = function(self){
    async.eachSeries(schema.postCreateMethods,
      function(fn, cb) {
        fn(self, cb);
      }, function(err){
        if (err){ throw err; }
    });
  };

  // Post-Update Methods
  schema.postUpdateMethods = [];

  schema.postUpdate = function(fn){
    schema.postUpdateMethods.push(fn);
  };

  schema.methods.runPostUpdate = function(self){
    async.eachSeries(schema.postUpdateMethods,
      function(fn, cb) {
        fn(self, cb);
      }, function(err){
        if (err){ throw err; }
    });
  };

}

module.exports = captainHook;
