// class: prototype methods
module.exports = function() {

        class C {
          constructor() {}
          method() { return 2; }
        }
        return typeof C.prototype.method === "function"
          && new C().method() === 2;
      
};