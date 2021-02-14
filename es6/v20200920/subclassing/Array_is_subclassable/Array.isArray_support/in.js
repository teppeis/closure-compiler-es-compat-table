// subclassing / Array is subclassable / Array.isArray support
module.exports = () => {
  class C extends Array {}
  return Array.isArray(new C());

};