// candidate (stage 3) / numeric separators
module.exports = () => {
return 1_000_000.000_001 === 1000000.000001 &&
0b1010_0001_1000_0101 === 0b1010000110000101;

};