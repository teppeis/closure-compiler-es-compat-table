// candidate (stage 3) / instance class fields / computed instance class fields
module.exports = () => {
class C {
['x'] = 42;
}
return new C().x === 42;

};