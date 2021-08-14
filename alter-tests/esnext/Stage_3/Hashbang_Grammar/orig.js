// Stage 3 / Hashbang Grammar
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  try {
    return !eval('#!/wash/your/hands');
  } catch (e) {
    return false
  }

};