module.exports = function() {
  var b = require("assert"), a = ["a", , "c"][Symbol.iterator]();
  b.deepEqual(a.next(), {value:"a", done:!1});
  b.deepEqual(a.next(), {value:void 0, done:!1});
  b.deepEqual(a.next(), {value:"c", done:!1});
  return !0 === a.next().done;
};

