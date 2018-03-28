// Reflect: Reflect.get
module.exports = function() {
return Reflect.get({ qux: 987 }, "qux") === 987;
      
};