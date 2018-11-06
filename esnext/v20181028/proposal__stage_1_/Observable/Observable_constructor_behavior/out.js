module.exports = function() {
  if (!(new Observable(function() {
  }) instanceof Observable)) {
    return !1;
  }
  try {
    new Observable({});
  } catch (a) {
    var b = !0;
  }
  try {
    new Observable(!1);
  } catch (a) {
    var c = !0;
  }
  try {
    Observable(function() {
    });
  } catch (a) {
    var d = !0;
  }
  return b && c && d;
};

