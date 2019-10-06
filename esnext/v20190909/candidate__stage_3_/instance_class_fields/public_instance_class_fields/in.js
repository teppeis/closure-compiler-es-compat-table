// candidate (stage 3) / instance class fields / public instance class fields
module.exports = () => {
class C {
x = 'x';
}
return new C().x === 'x';

};