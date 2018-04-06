// candidate (stage 3) / String.prototype.matchAll
module.exports = function() {
  var iterator = '11a2bb'.matchAll(/(\d)(\D)/g);
  if(iterator[Symbol.iterator]() !== iterator)return false;
  var a = '', b = '', c = '', step;
  while(!(step = iterator.next()).done){
    a += step.value[0];
    b += step.value[1];
    c += step.value[2];
  }
  return a === '1a2b'
&& b === '12'
&& c === 'ab';

};