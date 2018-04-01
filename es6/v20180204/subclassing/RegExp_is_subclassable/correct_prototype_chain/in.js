// subclassing / RegExp is subclassable / correct prototype chain
module.exports = function() {
class R extends RegExp {}
        var r = new R("baz","g");
        return r instanceof R && r instanceof RegExp && Object.getPrototypeOf(R) === RegExp;
      
};