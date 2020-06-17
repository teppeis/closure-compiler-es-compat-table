// finished (stage 4) / String.prototype.replaceAll
module.exports = () => {
  return 'q=query+string+parameters'.replaceAll('+', ' ') === 'q=query string parameters';

};