// destructuring: object destructuring
module.exports = function() {

        var {c, x:d, e} = {c:7, x:8};
        return c === 7 && d === 8 && e === undefined;
      
};