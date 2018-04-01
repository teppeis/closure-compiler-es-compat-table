module.exports = function() {
  var a = Object.getOwnPropertyNames("a");
  return 2 === a.length && ("length" === a[0] && "0" === a[1] || "0" === a[0] && "length" === a[1]);
};

