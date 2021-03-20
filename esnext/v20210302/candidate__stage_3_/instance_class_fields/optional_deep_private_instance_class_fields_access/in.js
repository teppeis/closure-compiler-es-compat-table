// candidate (stage 3) / instance class fields / optional deep private instance class fields access
module.exports = () => {
class C {
#x = 42;
x(o = {p: this}){
return o?.p.#x;
}
}
return new C().x() === 42 && new C().x(null) === void 0;

};