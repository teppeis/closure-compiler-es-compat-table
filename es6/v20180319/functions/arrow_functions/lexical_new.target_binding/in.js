// functions / arrow functions / lexical "new.target" binding
module.exports = () => {
  function C() {
    return x => new.target;
  }
  return new C()() === C && C()() === undefined;

};