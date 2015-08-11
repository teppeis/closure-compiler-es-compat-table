// class: extends
module.exports = function() {

        class B {}
        class C extends B {}
        return new C() instanceof B
          && B.isPrototypeOf(C);
      
};