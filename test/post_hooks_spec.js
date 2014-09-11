describe("Post-Hooks", function(){
  describe("postCreate()", function(){

    it("runs when an instance is created", function(done){
      var Comment = utils.resetModel();
      var output = [];

      Comment.schema.postCreate(function(comment, next){
        output.push("I'm a postCreate hook!");
        next();
      })

      var comment = new Comment(factory('comment'));
      comment.save(function(err, comment){
        if (err) throw err;
        expect(output.length).to.equal(1)
        expect(output).to.include("I'm a postCreate hook!");
        done();
      })
    }) // runs when an instance is created

    it("doesn't run when an instance is updated", function(done){
      var Comment = utils.resetModel();
      var output = [];

      Comment.schema.postCreate(function(comment, next){
        output.push("I'm a postCreate hook!");
        next();
      })

      var comment = new Comment(factory('comment'));
      comment.save(function(err, comment){
        if (err) throw err;
        expect(output.length).to.equal(1)
        expect(output).to.include("I'm a postCreate hook!");
        comment.content = "Oh, no. To live... to live would be an awfully big adventure."
        comment.save(function(err){
          // the hook should have only been executed on create, not on update
          expect(output.length).to.equal(1)
          done();
        })
      })
    }) // doesn't run when an instance is updated

  }) // postCreate()

  describe("postUpdate()", function(){

    it("runs when an instance is updated", function(done){
      var Comment = utils.resetModel();
      var output = [];

      Comment.schema.postUpdate(function(comment, next){
        output.push("I'm a postUpdate hook!");
        next();
      })

      var comment = new Comment(factory('comment'));
      comment.save(function(err, comment){
        if (err) throw err;
        comment.content = "Oh, no. To live... to live would be an awfully big adventure."
        comment.save(function(err){
          // the hook should have only been executed on update, not on create
          expect(output.length).to.equal(1)
          expect(output).to.include("I'm a postUpdate hook!");
          done();
        })
      })
    }) // runs when an instance is updated

    it("doesn't run when an instance is created", function(done){
      var Comment = utils.resetModel();
      var output = [];

      Comment.schema.postUpdate(function(comment, next){
        output.push("I'm a postUpdate hook!");
        next();
      })

      var comment = new Comment(factory('comment'));
      comment.save(function(err, comment){
        if (err) throw err;
        expect(output.length).to.equal(0)
        done();
      })
    }) // doesn't run when an instance is created

  }) // postUpdate()
})
