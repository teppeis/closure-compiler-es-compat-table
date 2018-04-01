module.exports = function() {
  var a = Date.prototype[Symbol.toPrimitive];
  return 2 === a.call(Object(2), "number") && "2" === a.call(Object(2), "string") && "2" === a.call(Object(2), "default");
};

