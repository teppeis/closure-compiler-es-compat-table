// functions / generators / can't use "this" with new
module.exports = function() {
  function* generator() {
    yield this.x;
    yield this.y;
  }
  try {
    new generator().next();
  } catch (e) {
    return true;
  }
};
