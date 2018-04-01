module.exports = function() {
  return "class A {}" === eval("(class A {})") + "";
};

