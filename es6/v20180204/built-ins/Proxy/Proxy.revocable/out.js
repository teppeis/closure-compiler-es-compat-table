module.exports = function() {
  var a = Proxy.revocable({}, {get:function() {
    return 5;
  }}), b = 5 === a.proxy.foo;
  a.revoke();
  try {
    a.proxy.foo;
  } catch (c) {
    b &= c instanceof TypeError;
  }
  return b;
};

