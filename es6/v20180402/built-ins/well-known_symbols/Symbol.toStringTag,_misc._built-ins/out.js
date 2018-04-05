module.exports = function() {
  var a = Symbol.toStringTag;
  return "Math" === Math[a] && "JSON" === JSON[a];
};

