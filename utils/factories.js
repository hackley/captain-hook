var factories = {

  comment: {
    userName: "Peter Pan",
    content: "To die would be a grand adventure!"
  }

}


module.exports = function(key){
  return factories[key];
}
