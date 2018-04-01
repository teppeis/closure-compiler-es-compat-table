// subclassing / Function is subclassable / can be called
module.exports = function() {
class C extends Function {}
        var c = new C("return 'foo';");
        return c() === 'foo';
      
};