// 2022 features / Ergonomic brand checks for private fields
module.exports = () => {
class A {
#x;
static check(obj) {
return #x in obj;
}
}
return A.check(new A) && !A.check({});

};