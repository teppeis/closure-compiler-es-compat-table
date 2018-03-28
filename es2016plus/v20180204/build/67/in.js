// Object.prototype getter/setter methods: __lookupSetter__
module.exports = function() {
var obj = {
         set foo(baz) { return "bar"; },
         qux: 1
         };
         var foo = Object.prototype.__lookupSetter__.call(obj, "foo");
         return foo() === "bar"
         && Object.prototype.__lookupSetter__.call(obj, "qux") === undefined
         && Object.prototype.__lookupSetter__.call(obj, "baz") === undefined;
         
};