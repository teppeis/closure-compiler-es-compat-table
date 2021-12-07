// 2019 features / Symbol.prototype.description / empty description
module.exports = () => {
  return Symbol('').description === '';

};