// object literal extensions: string-keyed shorthand methods
module.exports = function() {

        return ({ "foo bar"() { return 4; } })["foo bar"]() === 4;
      
};