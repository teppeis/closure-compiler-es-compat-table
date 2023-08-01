// functions / super / expression in constructors
module.exports = () => {
  class B {
    constructor(a) { return ["foo" + a]; }
  }
  class C extends B {
    constructor(a) { return super("bar" + a); }
  }
  return new C("baz")[0] === "foobarbaz";

};