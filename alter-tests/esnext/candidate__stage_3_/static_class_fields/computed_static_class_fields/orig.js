// candidate (stage 3) / static class fields / computed static class fields
module.exports = () => {
class C {
static ['x'] = 42;
}
return C.x === 42;

};