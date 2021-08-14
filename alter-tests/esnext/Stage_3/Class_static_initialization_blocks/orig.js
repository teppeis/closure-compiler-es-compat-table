// Stage 3 / Class static initialization blocks
module.exports = () => {
let ok = false;
class A {
static { ok = true; }
}
return ok;

};