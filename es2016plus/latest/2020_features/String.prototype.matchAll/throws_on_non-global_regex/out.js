module.exports = function() {
  if ("function" !== typeof String.prototype.matchAll) {
    return !1;
  }
  try {
    "11a2bb".matchAll(/(\d)(\D)/);
  } catch (a) {
    return !0;
  }
};

