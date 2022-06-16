// built-ins / well-known symbols / Symbol.isConcatSpreadable, spreadable object with poisoned getter
module.exports = () => {
  if (typeof Symbol !== 'function' || !Symbol.isConcatSpreadable) {
    return null;
  }
  var spreadableHasPoisonedIndex = { length: Math.pow(2, 53) - 1 };
  spreadableHasPoisonedIndex[Symbol.isConcatSpreadable] = true;
  Object.defineProperty(spreadableHasPoisonedIndex, 0, {
    get: function () { throw new SyntaxError(); }
  });
  try {
    [].concat(spreadableHasPoisonedIndex);
    return false;
  } catch (e) {
    return !!e && e.name === 'SyntaxError';
  }

};