// misc / Object static methods accept primitives / Object.getOwnPropertyDescriptor
module.exports = function() {
return Object.getOwnPropertyDescriptor('a', 'foo') === undefined;
      
};