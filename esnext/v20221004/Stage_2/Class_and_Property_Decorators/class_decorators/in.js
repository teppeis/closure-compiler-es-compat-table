// Stage 2 / Class and Property Decorators / class decorators
module.exports = () => {
class A {
@nonconf
get B() {}
}
function nonconf(target, name, descriptor) {
descriptor.configurable = false;
return descriptor;
}
return Object.getOwnPropertyDescriptor(A.prototype, "B").configurable === false;

};