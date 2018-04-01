module.exports = function() {
  var b = [], a = {constructor:null};
  a[Symbol.match] = !0;
  a = new Proxy(a, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  RegExp(a);
  return b[0] === Symbol.match && "constructor,source,flags" === b.slice(1) + "";
};

