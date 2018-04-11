// built-in extensions / Number properties / Number.isFinite
module.exports = function() {
  return Number.isFinite(Infinity) === false
    && Number.isFinite(-Infinity) === false
    && Number.isFinite(NaN) === false
    && Number.isFinite(0) === true;
};
