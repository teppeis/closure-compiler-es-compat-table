// 2019 misc / Symbol.prototype.description / empty description
module.exports = () => {
  return Symbol('').description === '';

};