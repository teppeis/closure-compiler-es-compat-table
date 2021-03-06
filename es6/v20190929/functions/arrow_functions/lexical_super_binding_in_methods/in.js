// functions / arrow functions / lexical "super" binding in methods
module.exports = () => {
  class B {
    qux() {
      return "quux";
    }
  }
  class C extends B {
    baz() {
      return x => super.qux();
    }
  }
  var arrow = new C().baz();
  return arrow() === "quux";

};