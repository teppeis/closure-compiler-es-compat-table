// syntax / default function parameters / separate scope
module.exports = () => {
  return (function(a=function(){
    return typeof b === 'undefined';
  }){
    var b = 1;
    return a();
  }());

};