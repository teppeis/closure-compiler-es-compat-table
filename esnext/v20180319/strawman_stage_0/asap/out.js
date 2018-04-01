module.exports = function() {
  var a = !1;
  setTimeout(function() {
    a = !1;
  }, 1);
  asap(function() {
    a && asyncTestPassed();
  });
  a = !0;
};

