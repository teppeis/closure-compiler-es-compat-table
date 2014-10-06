// Object.prototype.__proto__
module.exports = function () {
    var a = {},
        desc = Object.getOwnPropertyDescriptor
            && Object.getOwnPropertyDescriptor(Object.prototype,"__proto__");
    return !!(desc
        && "get" in desc
        && "set" in desc
        && desc.configurable
        && !desc.enumerable
        && Object.create(a).__proto__ === a);
  }