module.exports = function() {
  return "function" === typeof ShadowRealm && ["evaluate", "importValue"].every(function(a) {
    return a in ShadowRealm.prototype;
  });
};

