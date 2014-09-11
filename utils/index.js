mongoose      = require("mongoose"),
commentSchema = require("./comment_schema");

module.exports = utils = {

  i: 0,

  resetModel: function(schema){
    // default schema
    schema = typeof schema !== 'undefined' ? schema : commentSchema;
    utils.i ++;
    return mongoose.model('Model' + utils.i, schema);
  },

  mongoUri: "mongodb://localhost:27017/captain_hook_test",

  connectDB: function(){
    if (mongoose.connection.readyState == 0) {
      mongoose.connect(utils.mongoUri, function(err, res){
        if (err) { return console.log(err); }
      });
    }
  }

}

utils.connectDB();
