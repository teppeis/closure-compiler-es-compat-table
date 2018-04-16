// annex b / Object.prototype.__proto__ / absent from Object.create(null)
module.exports = () => {
  var o = Object.create(null), p = {};
  o.__proto__ = p;
  return Object.getPrototypeOf(o) !== p;

};