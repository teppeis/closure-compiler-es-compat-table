// arrow functions: can't be bound, can be curried
module.exports = function() {

        var d = { x : "bar", y : function() { return z => this.x + z; }}.y();
        var e = { x : "baz" };
        return d.bind(e, "ley")() === "barley";
      
};