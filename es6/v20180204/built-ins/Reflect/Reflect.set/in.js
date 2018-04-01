// built-ins / Reflect / Reflect.set
module.exports = function() {
var obj = {};
        Reflect.set(obj, "quux", 654);
        return obj.quux === 654;
      
};