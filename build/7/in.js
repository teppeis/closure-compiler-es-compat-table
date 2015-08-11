// default function parameters: new Function() support
module.exports = function() {

        return new Function("a = 1", "b = 2",
          "return a === 3 && b === 2;"
        )(3);
      
};