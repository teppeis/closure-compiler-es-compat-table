// built-ins / Reflect / Reflect.construct, Function subclassing
module.exports = function() {
function F(){}
        var obj = Reflect.construct(Function, ["return 2"], F);
        return obj() === 2 && obj instanceof F;
      
};