// subclassing / Function is subclassable / can be used with "new"
module.exports = function() {
class C extends Function {}
        var c = new C("this.bar = 2;");
        c.prototype.baz = 3;
        return new c().bar === 2 && new c().baz === 3;
      
};