module.exports = function() {
  var a = !1, b = Map.prototype.set;
  Map.prototype.set = function(b, c) {
    a = !0;
  };
  new Map([[1, 2]]);
  Map.prototype.set = b;
  return a;
};

