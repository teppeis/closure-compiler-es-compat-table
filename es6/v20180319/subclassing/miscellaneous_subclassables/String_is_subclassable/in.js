// subclassing / miscellaneous subclassables / String is subclassable
module.exports = function() {
class C extends String {}
        var c = new C("golly");
        return c instanceof String
          && c instanceof C
          && c + '' === "golly"
          && c[0] === "g"
          && c.length === 5;
      
};