// syntax / destructuring, parameters / duplicate identifier
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  try {
    eval('var d = function d([d]) { return d };if (d([true]) !== true) return false;');
  } catch (e) {
    return !(e instanceof SyntaxError);
  }
  try {
    eval('var f = function f([id, id]) { return id }');
    return false;
  } catch (e) {
    return e instanceof SyntaxError;
  }

};