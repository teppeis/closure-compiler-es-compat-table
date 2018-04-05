module.exports = function() {
  var a = [], b = [1];
  b.constructor = void 0;
  b = new Proxy(b, {get:function(b, c) {
    a.push(c);
    return b[c];
  }});
  Array.prototype.concat.call(b, b);
  return "constructor" === a[0] && a[1] === Symbol.isConcatSpreadable && "length" === a[2] && "0" === a[3] && a[4] === a[1] && a[5] === a[2] && a[6] === a[3] && 7 === a.length;
};

