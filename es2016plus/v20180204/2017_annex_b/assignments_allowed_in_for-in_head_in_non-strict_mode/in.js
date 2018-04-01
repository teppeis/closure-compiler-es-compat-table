// 2017 annex b / assignments allowed in for-in head in non-strict mode
module.exports = function() {
for (var i = 0 in {}) {}
     return i === 0;
     
};