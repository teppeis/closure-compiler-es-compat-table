module.exports = function() {
  class C {
    * generator() {
      yield 5; yield 6;
    }
  };
  class D {
    * constructor() {
      return {};
    }
  }
  return false;
};
