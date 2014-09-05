var hooks = require('hooks'),
    async = require('async');

function captainHook(schema) {

  schema.pre('save', function (next) {
    this._wasNew = this.isNew;
    if (this.isNew) {
      this.runPreCreate(function(){
        console.log("la fin");
        next();
      })
    } else {
      this.runPreUpdate(function(){
        console.log("la fin update");
        next();
      })
    }
  })

  // Pre-Create Methods
  schema.preCreateMethods = []

  schema.preCreate = function(fn){
    var self = this;
    schema.preCreateMethods.push(function(next){
      fn(self, next);
    });
  }

  schema.methods.runPreCreate = function(callback){
    async.series(schema.preCreateMethods,
    function(err, results){
      callback();
    });
  }

  // Pre-Update Methods
  schema.preUpdateMethods = []

  schema.preUpdate = function(fn){
    schema.preUpdateMethods.push(fn);
  }

  schema.methods.runPreUpdate = function(callback){
    async.series(schema.preUpdateMethods,
    function(err, results){
      callback();
    });
  }





  schema.post('save', function () {
    if (this._wasNew) {
      this.runPostCreate();
    } else {
      this.runPostUpdate();
    }
  })


  // Post-Create Methods
  schema.postCreateMethods = []

  schema.postCreate = function(fn){
    schema.postCreateMethods.push(fn);
  }

  schema.methods.runPostCreate = function(){
    async.series(schema.postCreateMethods);
  }


  // Post-Update Methods
  schema.postUpdateMethods = []

  schema.postUpdate = function(fn){
    schema.postUpdateMethods.push(fn);
  }

  schema.methods.runPostUpdate = function(){
    async.series(schema.postUpdateMethods);
  }

}

module.exports = captainHook;
