var expect        = require("chai").expect,
    mongoose      = require("mongoose"),
    schema        = require("./setup/comment_schema"),
    commentData   = require("./setup/comment_data");


describe("Captain Hook", function(){
  describe("preCreate()", function(){

    it("runs before the instance is created", function(done){
      var output = [];
      var commentSchema = require("./setup/comment_schema");

      commentSchema.preCreate(function(comment, next){
        output.push("I'm a preCreate hook!");
        next();
      })

      commentSchema.pre('save', function(next){
        // expect(output).to.include("I'm a preCreate hook!");
        expect(output).to.include("testing")
        next();
      })

      Comment = mongoose.model('Comment', commentSchema);
      var comment = new Comment(commentData);
      comment.save(function(){
        done();
      })
    })



    it("doesn't run before the instance is updated", function(done){
      var output = [];
      var commentSchema = require("./setup/comment_schema");

      commentSchema.preCreate(function(comment, next){
        output.push("I'm a preCreate hook!");
        next();
      })

      Comment = mongoose.model('Comment', commentSchema);
      var comment = new Comment(commentData);
      comment.save(function(err, comment){
        expect(output.length).to.equal(2);
        console.log("test");
        comment.content = "Oh, no. To live... to live would be an awfully big adventure."
        comment.save(function(){
          expect(output.length).to.equal(1);
          done();
        })
      })
    })


  })
})
