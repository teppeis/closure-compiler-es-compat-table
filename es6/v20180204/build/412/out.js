module.exports = function() {
  var a = function(b) {
    var a = {foo:b};
    try {
      a[b] = 1;
    } catch (e) {
    }
    var c = [b];
    return '{"foo":{}}' === JSON.stringify(a) && "[{}]" === JSON.stringify(c) && "{}" === JSON.stringify(b);
  }, d = Object(Symbol()), c = Object(Symbol());
  Object.defineProperty(c, "toJSON", {enumerable:!1, value:null});
  return a(d) && a(c);
};

