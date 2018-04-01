// 2017 annex b / Object.prototype getter/setter methods / __defineGetter__, ToObject(this)
module.exports = function() {
var key = '__accessors_test__';
         __defineGetter__.call(1, key, function(){});
         try {
         __defineGetter__.call(null, key, function(){});
         } catch(e){
         return true;
         }
         
};