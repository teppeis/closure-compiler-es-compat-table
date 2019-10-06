// functions / class / constructor
module.exports = () => {
  class C {
    constructor() { this.x = 1; }
  }
  return C.prototype.constructor === C
&& new C().x === 1;

};