// functions / class / extends null
module.exports = () => {
  class C extends null {
    constructor() { return Object.create(null); }
  }
  return Function.prototype.isPrototypeOf(C)
&& Object.getPrototypeOf(C.prototype) === null;

};