// functions / class / implicit strict mode
module.exports = () => {
  class C {
    static method() { return this === undefined; }
  }
  return (0,C.method)();

};