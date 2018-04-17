// built-in extensions / Number properties / Number.MAX_SAFE_INTEGER
module.exports = () => {
  // NOTE: this assinment is needed to insert polyfill
  var n = Number.MAX_SAFE_INTEGER;
  return n === Math.pow(2, 53) - 1;
};
