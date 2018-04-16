// functions / super / in methods, method calls
module.exports = () => {
  class B {
    qux(a) { return "foo" + a; }
  }
  class C extends B {
    qux(a) { return super.qux("bar" + a); }
  }
  return new C().qux("baz") === "foobarbaz";

};