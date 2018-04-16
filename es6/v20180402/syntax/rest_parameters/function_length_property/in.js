// syntax / rest parameters / function 'length' property
module.exports = () => {
  return function(a, ...b){}.length === 1 && function(...c){}.length === 0;

};