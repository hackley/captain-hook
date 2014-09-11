var mongoose    = require('mongoose'),
    captainHook = require('../lib');

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
