module.exports = function() {
  var a = [][Symbol.iterator](), b = Object.getPrototypeOf(a);
  return Object.getPrototypeOf(b).hasOwnProperty(Symbol.iterator) && !b.hasOwnProperty(Symbol.iterator) && !a.hasOwnProperty(Symbol.iterator) && a[Symbol.iterator]() === a;
};

