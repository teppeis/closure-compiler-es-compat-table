// built-ins / Symbol / Object(symbol)
module.exports = () => {
  var symbol = Symbol();
  var symbolObject = Object(symbol);
  return typeof symbolObject === "object" &&
symbolObject instanceof Symbol &&
symbolObject == symbol &&
symbolObject !== symbol &&
symbolObject.valueOf() === symbol;

};