// functions / arrow functions / lexical "super" binding in constructors
module.exports = function() {
var received;

        class B {
          constructor (arg) {
            received = arg;
          }
        }
        class C extends B {
          constructor () {
            var callSuper = () => super('foo');
            callSuper();
          }
        }
        return new C instanceof C && received === 'foo'
      
};