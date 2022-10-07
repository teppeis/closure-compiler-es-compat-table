module.exports = function() {
  if (!({__proto__:[]} instanceof Array)) {
    return !1;
  }
  var a = {};
  return !((a.__proto__ = [], a) instanceof Array);
};

