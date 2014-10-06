// Symbol
module.exports = function () {
    try {
      var object = {};
      var symbol = Symbol();
      var value = Math.random();
      object[symbol] = value;
      return typeof symbol === "symbol" &&
             object[symbol] === value &&
             Object.keys(object).length === 0 &&
             Object.getOwnPropertyNames(object).length === 0;
    }
    catch(e) {
      return false;
    }
  }