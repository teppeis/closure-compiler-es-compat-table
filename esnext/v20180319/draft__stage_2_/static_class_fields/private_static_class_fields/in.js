// draft (stage 2) / static class fields / private static class fields
module.exports = function() {
class C {
static #x = 42;
x(){
return C.#x;
}
}
return new C().x() === 42;

};