// built-ins / Symbol / Object(symbol)
module.exports = () => {
  var symbol = Symbol();
  var symbolObject = Object(symbol);
  return typeof symbolObject === "object" &&
symbolObject instanceof Symbol &&
symbolObject == symbol && // eslint-disable-line eqeqeq
symbolObject !== symbol &&
symbolObject.valueOf() === symbol;

};