// functions / generators / shorthand generators can't be constructors
module.exports = () => {
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
