module.exports = function() {
  return "barley" === {x:"bar", y:function() {
    var a = this;
    return function(b) {
      return a.x + b;
    };
  }}.y().bind({x:"baz"}, "ley")();
};

