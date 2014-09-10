var expect        = require("chai").expect,
    mongoose      = require("mongoose"),
    Comment       = require("./setup/comment_schema"),
    commentData   = require("./setup/comment_data");

// Connect to Mongo DB
mongoose.connect("mongodb://localhost:27017/captain_hook_test", function(err, res){
  if (err) {
    console.log("Cannot connect to MongoDB!");
    return console.log(err);
  }
});


describe("Pre-Hooks", function(){
  describe("preCreate()", function(){

    it("runs before an instance is created", function(done){
      var output = [];

      Comment.schema.preCreate(function(comment, next){
        output.push("I'm a preCreate hook!");
        next();
      })

      Comment.schema.pre('save', function(next){
        expect(output).to.include("I'm a preCreate hook!");
        next();
      })

      var comment = new Comment(commentData);
      comment.save(function(err, comment){
        if (err) throw err;
        expect(output.length).to.equal(1)
        done();
      })
    })

    it("doesn't run before an instance is updated", function(done){
      var output = [];

      Comment.schema.preCreate(function(comment, next){
        output.push("I'm a preCreate hook!");
        next();
      })

      Comment.schema.pre('save', function(next){
        expect(output).to.include("I'm a preCreate hook!");
        next();
      })

      var comment = new Comment(commentData);
      comment.save(function(err, comment){
        if (err) throw err;
        expect(output.length).to.equal(1)
        comment.content = "Oh, no. To live... to live would be an awfully big adventure."
        comment.save(function(err){
          // the hook should have only been executed on create, not on update
          expect(output.length).to.equal(1)
          done();
        })
      })
    })

  }) // preCreate()


  describe("preUpdate()", function(){

    it("runs before an instance is updated", function(done){
      var output = [];

      Comment.schema.preUpdate(function(comment, next){
        output.push("I'm a preUpdate hook!");
        next();
      })

      var comment = new Comment(commentData);
      comment.save(function(err, comment){
        if (err) throw err;
        comment.content = "Oh, no. To live... to live would be an awfully big adventure."
        comment.save(function(err){
          // the hook should execute here
          expect(output.length).to.equal(1)
          expect(output).to.include("I'm a preUpdate hook!")
          done();
        })
      })
    })

    it("doesn't run before an instance is created", function(done){
      var output = [];

      Comment.schema.preUpdate(function(comment, next){
        output.push("I'm a preUpdate hook!");
        next();
      })

      var comment = new Comment(commentData);
      comment.save(function(err, comment){
        if (err) throw err;
        expect(output.length).to.equal(0)
        done();
      })
    })

  }) // preUpdate()
})
