// candidate (stage 3) / private class methods / private static methods
module.exports = () => {
class C {
static #x() { return 42; }
x() {
return C.#x();
}
}
return new C().x() === 42;

};