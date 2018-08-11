module.exports = function(b) {
  var a = !1;
  setTimeout(function() {
    a = !1;
  }, 1);
  asap(function() {
    a && b();
  });
  a = !0;
};

