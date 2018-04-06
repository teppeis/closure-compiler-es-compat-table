// strawman (stage 0) / syntactic tail calls / mutual recursion
module.exports = function() {
"use strict";
function f(n){
if (n <= 0) {
return  "foo";
}
return continue g(n - 1);
}
function g(n){
if (n <= 0) {
return  "bar";
}
return continue f(n - 1);
}
return f(1e6) === "foo" && f(1e6+1) === "bar";

};