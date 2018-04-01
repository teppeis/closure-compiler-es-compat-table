// 2017 annex b / Proxy internal calls, getter/setter methods / __lookupSetter__
module.exports = function() {
// Object.prototype.__lookupSetter__ -> [[GetOwnProperty]]
         // Object.prototype.__lookupSetter__ -> [[GetPrototypeOf]]
         var gopd = [];
         var gpo = false;
         var p = new Proxy({}, {
         getPrototypeOf: function(o) { gpo = true; return Object.getPrototypeOf(o); },
         getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }
         });
         Object.prototype.__lookupSetter__.call(p, "foo");
         return gopd + '' === "foo" && gpo;
         
};