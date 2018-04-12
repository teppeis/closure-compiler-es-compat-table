module.exports = function() {
  var a = Array.apply(null, [, , ]);
  return "0" in a && "1" in a && "undefinedundefined" === "" + a[0] + a[1];
};

