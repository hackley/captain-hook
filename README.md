Captain Hook
============

*Pre- and Post- Create and Update Hooks for Mongoose ODM.*

[![Code Climate](https://codeclimate.com/github/nathanhackley/captain-hook/badges/gpa.svg)](https://codeclimate.com/github/nathanhackley/captain-hook)

#### Use-Case
Out of the box, Mongoose provides you with the handy `pre('save')` and `post('save')` methods. Unfortunately, these hooks run every time the instance is saved, whether it is being created or updated. Captain Hook extends Mongoose to give you greater control over this functionality.

## Usage

`npm install captain-hook --save`

In your Mongoose model:
```js
var captainHook  = require('captain-hook');
var userSchema = mongoose.Schema();

userSchema.plugin(captainHook);

// function to run before saving a new user instance
userSchema.preCreate(function(user, next){
  console.log("You are about to create a user:" + user.email);
  next();
})

// function to run after saving a new user instance
userSchema.postCreate(function(user, next){
  console.log("You just created a user:" + user.email);
  next();
})

// function to run before updating an existing user instance
userSchema.preUpdate(function(user, next){
  console.log("You are about to update a user:" + user.email);
  next();
})

// function to run before updating an existing user instance
userSchema.postUpdate(function(user, next){
  console.log("You just updated a user:" + user.email);
  next();
})

```

Multiple pre- and post- methods can be added for each timing (preCreate, postCreate, preUpdate, postUpdate) and the functions will be run in the order they are defined.

The `next()` callback must be called for every hook.

-------------------

### TO DO:
- Tests for hooks firing in the correct order
- More granular unit tests
    - schema.preCreate()
    - schema.methods.runPreCreate(), etc
    - schema.preCreateMethods array
