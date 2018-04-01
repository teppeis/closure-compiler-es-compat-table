module.exports = function() {
  new Proxy({}, {});
  try {
    return Proxy({}, {}), !1;
  } catch (a) {
    return !0;
  }
};

