// strawman (stage 0) / bind (::) operator / binary form
module.exports = function() {
function foo() { this.garply += "foo"; return this; }
        var obj = { garply: "bar" };
        return typeof obj::foo === "function" && obj::foo().garply === "barfoo";
      
};