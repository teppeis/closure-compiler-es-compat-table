// 2017 features / trailing commas in function syntax / in parameter lists
module.exports = () => {
  return typeof function f( a, b, ){} === 'function';

};