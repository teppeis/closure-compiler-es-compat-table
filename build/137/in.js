// Object static methods: Object.is
module.exports = function() {

        return typeof Object.is === 'function' &&
          Object.is(NaN, NaN) &&
         !Object.is(Math.round(-0.1), Math.round(0.1));
      
};