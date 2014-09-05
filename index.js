function captainHook(schema, options) {

  schema.pre('save', function (next) {
    if (this.isNew) this.emit('pre_create', this)
    else this.emit('pre_update', this);
    this._wasNew = this.isNew;
    next();
  })

  schema.post('save', function () {
    if (this._wasNew) this.emit('post_create', this)
    else this.emit('post_update', this);
  })

  schema.statics.preCreate = function(callback){
    schema.post('pre_create', function(self){
      callback(self);
    });
  }

  schema.statics.preUpdate = function(callback){
    schema.post('pre_update', function(self){
      callback(self);
    });
  }

  schema.statics.postCreate = function(callback){
    schema.post('post_create', function(self){
      callback(self);
    });
  }

  schema.statics.postUpdate = function(callback){
    schema.post('post_update', function(self){
      callback(self);
    });
  }

}

module.exports = captainHook;
