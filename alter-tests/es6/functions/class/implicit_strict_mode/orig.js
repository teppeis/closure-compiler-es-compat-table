// functions / class / implicit strict mode
module.exports = () => {
  class C {
    static method() { return this === void undefined; }
  }
  return (0,C.method)();

};