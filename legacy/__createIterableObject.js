/* eslint-disable strict */
global.__createIterableObject = function (arr, methods) {
  methods = methods || {};
  // eslint-disable-next-line no-undef
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return {};
  }
  arr.length++;
  var iterator = {
    next: function () {
      return { value: arr.shift(), done: arr.length <= 0 };
    },
    return: methods.return,
    throw: methods.throw,
  };
  var iterable = {};
  // eslint-disable-next-line no-undef
  iterable[Symbol.iterator] = function () {
    return iterator;
  };
  return iterable;
};
