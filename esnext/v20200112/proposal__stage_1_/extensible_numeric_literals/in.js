// proposal (stage 1) / extensible numeric literals
module.exports = () => {
function i (str, num) {
return typeof str + str + typeof num + num;
}
return 123i === 'string123number123';

};