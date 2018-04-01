// 2017 annex b / Object.prototype getter/setter methods / __lookupGetter__, ToObject(this)
module.exports = function() {
  __lookupGetter__.call(1, "key");
  try {
    __lookupGetter__.call(null, "key");
  } catch (e) {
    return true;
  }
};
