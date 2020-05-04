// 2017 annex b / Object.prototype getter/setter methods / __lookupSetter__
module.exports = () => {
  var obj = {
    set foo(baz) { return "bar"; },
    qux: 1
  };
  var foo = Object.prototype.__lookupSetter__.call(obj, "foo");
  return foo() === "bar"
&& Object.prototype.__lookupSetter__.call(obj, "qux") === void undefined
&& Object.prototype.__lookupSetter__.call(obj, "baz") === void undefined;

};