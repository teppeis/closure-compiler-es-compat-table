// built-in extensions / Number properties / Number.MIN_SAFE_INTEGER
module.exports = () => {
  // NOTE: this assinment is needed to insert polyfill
  var n = Number.MIN_SAFE_INTEGER;
  return n === -(Math.pow(2, 53) - 1);
};
