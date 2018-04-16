// strawman (stage 0) / String.prototype.at
module.exports = () => {
  return 'a𠮷b'.at(1) === '𠮷';

};