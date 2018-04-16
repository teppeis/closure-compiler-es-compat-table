// candidate (stage 3) / instance class fields / private instance class fields basic support
module.exports = () => {
class C {
#x;
constructor(x){
this.#x = x;
}
x(){
return this.#x;
}
}
return new C(42).x() === 42;

};