// arrow functions: no "prototype" and "name" properties
module.exports = function() {

        var a = () => 5;
        return !a.hasOwnProperty("prototype") && a.name === ""; 
      
};