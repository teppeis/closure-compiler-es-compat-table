// proposal (stage 1) / String.prototype.replaceAll
module.exports = () => {
  return 'q=query+string+parameters'.replaceAll('+', ' ') === 'q=query string parameters';

};