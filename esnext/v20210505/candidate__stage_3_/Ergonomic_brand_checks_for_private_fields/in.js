// candidate (stage 3) / Ergonomic brand checks for private fields
module.exports = () => {
class A {
#x;
static check(obj) {
return #x in obj;
}
}
return A.check(new A) && !A.check({});

};