module.exports = function() {
// ClassDefinitionEvaluation -> Get -> [[Get]]
var get = [];
var p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});
class C extends p {}
return get + '' === "prototype";

};