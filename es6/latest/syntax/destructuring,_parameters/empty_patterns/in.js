// syntax / destructuring, parameters / empty patterns
module.exports = function() {
  return function ([],{}){
    return arguments[0] + '' === "3,4" && arguments[1].x === "foo";
  }([3,4],{x:"foo"});

};