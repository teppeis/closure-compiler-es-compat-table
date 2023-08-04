// 2021 features / String.prototype.replaceAll
module.exports = () => {
  return 'q=query+string+parameters'.replaceAll('+', ' ') === 'q=query string parameters';

};