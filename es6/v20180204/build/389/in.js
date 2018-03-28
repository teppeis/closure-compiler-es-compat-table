// Reflect: Reflect.construct creates instances from third argument
module.exports = function() {
function F(){}
        var obj = Reflect.construct(function(){ this.y = 1; }, [], F);
        return obj.y === 1 && obj instanceof F;
      
};