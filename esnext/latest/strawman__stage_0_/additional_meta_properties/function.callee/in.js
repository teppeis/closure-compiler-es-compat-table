// strawman (stage 0) / additional meta properties / function.callee
module.exports = () => {
var f = _ => function.callee === f;
return f();

};