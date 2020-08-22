module.exports = function() {
  var a = {x:"bar", y:function() {
    var b = this;
    return function(c) {
      return b.x + c;
    };
  }}.y(), d = {x:"baz", y:a};
  return "barley" === a("ley") && "barley" === d.y("ley");
};

