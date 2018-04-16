// functions / generators / shorthand generators can't be constructors
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  class C {
    * generator() {
      yield 5; yield 6;
    }
  };
  try {
    Function("class D { * constructor() { return {}; } }");
  } catch(e) {
    return true;
  }

};