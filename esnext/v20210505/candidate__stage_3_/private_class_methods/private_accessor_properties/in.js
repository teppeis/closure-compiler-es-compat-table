// candidate (stage 3) / private class methods / private accessor properties
module.exports = () => {
var y = false;
class C {
get #x() { return 42; }
set #x(x) { y = x; }
x() {
this.#x = true;
return this.#x;
}
}
return new C().x() === 42 && y;

};