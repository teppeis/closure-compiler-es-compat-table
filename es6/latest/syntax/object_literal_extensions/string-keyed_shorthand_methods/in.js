// syntax / object literal extensions / string-keyed shorthand methods
module.exports = () => {
  return ({ "foo bar"() { return 4; } })["foo bar"]() === 4;

};