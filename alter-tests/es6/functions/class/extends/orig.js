// functions / class / extends
module.exports = () => {
  class B {}
  class C extends B {}
  return new C() instanceof B
&& B.isPrototypeOf(C);

};