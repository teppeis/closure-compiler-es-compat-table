// 2022 features / private class methods / private static accessor properties
module.exports = () => {
var y = false;
class C {
static get #x() { return 42; }
static set #x(x) { y = x; }
x() {
C.#x = true;
return C.#x;
}
}
return new C().x() === 42 && y;

};