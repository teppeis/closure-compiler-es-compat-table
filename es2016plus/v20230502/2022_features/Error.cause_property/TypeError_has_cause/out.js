module.exports = function() {
  var a = new TypeError("error", {cause:"cause"});
  return a.hasOwnProperty("cause") && "cause" === a.cause;
};

