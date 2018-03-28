// Object.prototype getter/setter methods: __lookupSetter__, ToObject(this)
module.exports = function() {
__lookupSetter__.call(1, 'key');
         try {
         __lookupSetter__.call(null, 'key');
         } catch(e){
         return true;
         }
         
};