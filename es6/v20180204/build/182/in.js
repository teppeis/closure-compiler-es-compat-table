// class: optional semicolons
module.exports = function() {
class C {
          ;
          method() { return 2; };
          method2() { return 2; }
          method3() { return 2; };
        }
        return typeof C.prototype.method === "function"
          && typeof C.prototype.method2 === "function"
          && typeof C.prototype.method3 === "function";
      
};