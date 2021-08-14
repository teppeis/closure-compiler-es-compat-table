// 2022 features / instance class fields / optional private instance class fields access
module.exports = () => {
class C {
#x = 42;
x(o = this){
return o?.#x;
}
}
return new C().x() === 42 && new C().x(null) === void 0;

};