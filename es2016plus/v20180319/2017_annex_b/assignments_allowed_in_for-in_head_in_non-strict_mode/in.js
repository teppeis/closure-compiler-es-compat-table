// 2017 annex b / assignments allowed in for-in head in non-strict mode
module.exports = () => {
  for (var i = 0 in {}) {}
  return i === 0;

};