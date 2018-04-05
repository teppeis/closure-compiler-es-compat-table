// candidate (stage 3) / Function.prototype.toString revision / arrows
module.exports = function() {
  var str = "a => b";
  return eval("(" + str + ")") + "" === str;
};
