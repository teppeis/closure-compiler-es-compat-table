// draft (stage 2) / throw expressions / arrow function bodies
module.exports = function() {
var fn = () => throw 42;
        try {
          fn();
        } catch (e) {
          return e === 42;
        }
      
};