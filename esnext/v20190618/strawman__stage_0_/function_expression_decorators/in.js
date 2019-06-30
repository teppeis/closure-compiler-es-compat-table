// strawman (stage 0) / function expression decorators
module.exports = () => {
function inverse(f){
return function(){
return !f.apply(this, arguments);
};
}
return (@inverse function(it){
return it % 2;
})(2);

};