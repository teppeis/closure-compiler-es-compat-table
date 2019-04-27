module.exports = function() {
  var a = {x:"bar", y:function() {
    var a = this;
    return function(b) {
      return a.x + b;
    };
  }}.y(), b = {x:"baz", y:a};
  return "barley" === a("ley") && "barley" === b.y("ley");
};

