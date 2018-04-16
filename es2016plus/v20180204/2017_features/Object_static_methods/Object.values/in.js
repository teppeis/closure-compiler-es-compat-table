// 2017 features / Object static methods / Object.values
module.exports = () => {
  var obj = Object.create({ a: "qux", d: "qux" });
  obj.a = "foo"; obj.b = "bar"; obj.c = "baz";
  var v = Object.values(obj);
  return Array.isArray(v) && String(v) === "foo,bar,baz";

};