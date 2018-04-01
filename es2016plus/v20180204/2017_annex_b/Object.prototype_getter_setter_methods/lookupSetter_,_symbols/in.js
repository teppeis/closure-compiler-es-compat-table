// 2017 annex b / Object.prototype getter/setter methods / __lookupSetter__, symbols
module.exports = function() {
var sym = Symbol();
         var sym2 = Symbol();
         var obj = {};
         Object.defineProperty(obj, sym, { set: function(baz) { return "bar"; }});
         Object.defineProperty(obj, sym2, { value: 1 });
         var foo = Object.prototype.__lookupSetter__.call(obj, sym);
         return foo() === "bar"
         && Object.prototype.__lookupSetter__.call(obj, sym2) === undefined
         && Object.prototype.__lookupSetter__.call(obj, Symbol()) === undefined;
         
};