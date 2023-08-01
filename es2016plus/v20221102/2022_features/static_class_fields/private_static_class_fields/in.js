// 2022 features / static class fields / private static class fields
module.exports = () => {
class C {
static #x = 42;
x(){
return C.#x;
}
}
return new C().x() === 42;

};