// destructuring: combined destructuring
module.exports = function() {

        var [e, {x:f, g}] = [9, {x:10}];
        return e === 9 && f === 10 && g === undefined;
      
};