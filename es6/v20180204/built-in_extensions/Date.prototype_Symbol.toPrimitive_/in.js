// built-in extensions / Date.prototype[Symbol.toPrimitive]
module.exports = () => {
  var tp = Date.prototype[Symbol.toPrimitive];
  return tp.call(Object(2), "number") === 2
&& tp.call(Object(2), "string") === "2"
&& tp.call(Object(2), "default") === "2";

};