// Symbol.create
module.exports = function () {
    if (typeof Symbol === "function" && typeof Symbol.create === "symbol") {
      var a = 2, b = function(){};
      Object.defineProperty(b, Symbol.create, { value: function() { a = 4; return {};} });
      new b();
      return a === 4;
    }
    return false;
  }