// class
module.exports = function() {

    class C extends Array {
      constructor() { this.b = true; }
      a(){}
      static d(){}
    }
    return C.d && new C().a && new C().b && new C() instanceof Array;
  
};