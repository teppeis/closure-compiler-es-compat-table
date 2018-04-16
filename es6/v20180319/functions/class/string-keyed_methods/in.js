// functions / class / string-keyed methods
module.exports = () => {
  class C {
    "foo bar"() { return 2; }
  }
  return typeof C.prototype["foo bar"] === "function"
&& new C()["foo bar"]() === 2;

};