// annex b / Object.prototype.__proto__ / set prototype
module.exports = () => {
  var o = {};
  o.__proto__ = Array.prototype;
  return o instanceof Array;

};