// strawman (stage 0) / bind (::) operator / unary form
module.exports = () => {
var obj = { garply: "bar", foo: function() { this.garply += "foo"; return this; } };
return typeof ::obj.foo === "function" && ::obj.foo().garply === "barfoo";

};