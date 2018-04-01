module.exports = function() {
  var a = Object.getOwnPropertyDescriptor({get a() {
  }}, "a").get;
  try {
    new a;
  } catch (b) {
    return !0;
  }
};

