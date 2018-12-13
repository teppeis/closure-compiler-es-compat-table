module.exports = function() {
  var a = !1;
  (new Proxy(function() {
  }, {apply:function() {
    a = !0;
  }}))();
  try {
    return (new Proxy({}, {apply:function() {
    }}))(), !1;
  } catch (b) {
  }
  return a;
};

