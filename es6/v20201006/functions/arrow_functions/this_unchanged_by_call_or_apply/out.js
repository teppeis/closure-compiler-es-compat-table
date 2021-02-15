module.exports = function() {
  var a = {x:"foo", y:function() {
    var c = this;
    return function() {
      return c.x;
    };
  }}, b = {x:"bar"};
  return "foo" === a.y().call(b) && "foo" === a.y().apply(b);
};

