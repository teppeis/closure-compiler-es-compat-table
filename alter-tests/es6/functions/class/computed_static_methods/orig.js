// functions / class / computed static methods
module.exports = function() {
  var foo = "method";
  class C {
    static [foo]() { return 3; }
  }
  return typeof C.method === "function"
&& C.method() === 3;

};