module.exports = function() {
  var b = {}, c = {}, a = new Proxy(b, {getPrototypeOf:function(a) {
    return a === b && c;
  }});
  return Object.getPrototypeOf(a) === c;
};

