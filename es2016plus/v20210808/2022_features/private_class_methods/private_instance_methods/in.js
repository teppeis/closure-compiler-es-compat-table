// 2022 features / private class methods / private instance methods
module.exports = () => {
class C {
#x() { return 42; }
x() {
return this.#x();
}
}
return new C().x() === 42;

};