module.exports = function() {
  var a = new URIError("error", {cause:"cause"});
  return a.hasOwnProperty("cause") && "cause" === a.cause;
};

