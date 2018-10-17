// candidate (stage 3) / static class fields / public static class fields
module.exports = () => {
class C {
static x = 'x';
}
return C.x === 'x';

};