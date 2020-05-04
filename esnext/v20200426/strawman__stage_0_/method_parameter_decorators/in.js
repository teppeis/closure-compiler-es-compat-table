// strawman (stage 0) / method parameter decorators
module.exports = () => {
var target, key, index;
function decorator(_target, _key, _index){
target = _target;
key = _key;
index = _index;
}
class C {
method(@decorator foo){ }
}
return target === C.prototype
&& key === 'method'
&& index === 0;

};