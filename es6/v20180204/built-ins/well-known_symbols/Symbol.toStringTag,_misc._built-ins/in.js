// built-ins / well-known symbols / Symbol.toStringTag, misc. built-ins
module.exports = function() {
  var s = Symbol.toStringTag;
  return Math[s] === "Math"
&& JSON[s] === "JSON";

};