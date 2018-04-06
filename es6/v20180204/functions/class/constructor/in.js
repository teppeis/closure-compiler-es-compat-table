// functions / class / constructor
module.exports = function() {
  class C {
    constructor() { this.x = 1; }
  }
  return C.prototype.constructor === C
&& new C().x === 1;

};