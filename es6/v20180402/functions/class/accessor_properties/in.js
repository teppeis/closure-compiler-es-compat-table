// functions / class / accessor properties
module.exports = function() {
  var baz = false;
  class C {
    get foo() { return "foo"; }
    set bar(x) { baz = x; }
  }
  new C().bar = true;
  return new C().foo === "foo" && baz;

};