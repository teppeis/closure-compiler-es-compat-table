module.exports = function() {
  var a = {x:"foo", y:function() {
    var a = this;
    return function() {
      return a.x;
    };
  }}, b = {x:"bar"};
  return "foo" === a.y().call(b) && "foo" === a.y().apply(b);
};

