// class: static methods
module.exports = function() {

        class C {
          constructor() {}
          static method() { return 3; }
        }
        return typeof C.method === "function"
          && C.method() === 3;
      
};