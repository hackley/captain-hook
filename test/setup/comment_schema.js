var mongoose    = require('mongoose'),
    captainHook = require('../../lib');

// Connect to Mongo DB
mongoose.connect("mongodb://localhost:27017/captain_hook_test");

var commentSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

commentSchema.plugin(captainHook);

module.exports = commentSchema;
