mongoose      = require("mongoose"),
commentSchema = require("./comment_schema");

utils = {

  i: 0,

  resetModel: function(schema){
    // default schema
    schema = typeof schema !== 'undefined' ? schema : commentSchema;
    utils.i ++;
    return mongoose.model('Model' + utils.i, schema);
  },

  connectDB: function(){
    if (mongoose.connection.readyState == 0) {
      mongoose.connect("mongodb://localhost:27017/captain_hook_test", function(err, res){
        if (err) {
          console.log("Cannot connect to MongoDB!");
          return console.log(err);
        }
      });
    }
  }

}


module.exports = utils;
