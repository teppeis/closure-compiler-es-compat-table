// candidate (stage 3) / Symbol.prototype.description
module.exports = () => {
  return Symbol('foo').description === 'foo';

};