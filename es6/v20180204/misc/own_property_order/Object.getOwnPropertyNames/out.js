module.exports = function() {
  var a = {2:!0, 0:!0, 1:!0, " ":!0, 9:!0, D:!0, B:!0, "-1":!0, A:!0, 3:!0};
  "EFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function(b) {
    a[b] = !0;
  });
  Object.defineProperty(a, "C", {value:!0, enumerable:!0});
  Object.defineProperty(a, "4", {value:!0, enumerable:!0});
  delete a[2];
  a[2] = !0;
  return "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC" === Object.getOwnPropertyNames(a).join("");
};

