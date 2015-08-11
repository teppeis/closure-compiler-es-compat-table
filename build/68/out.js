module.exports = function() {
  try {
    eval("({a,b}) = {a:3,b:4};");
  } catch (a) {
    return !0;
  }
};

