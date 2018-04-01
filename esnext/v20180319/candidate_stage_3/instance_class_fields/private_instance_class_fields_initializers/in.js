// candidate (stage 3) / instance class fields / private instance class fields initializers
module.exports = function() {
class C {
          #x = 42;
          x(){
            return this.#x;
          }
        }
        return new C().x() === 42;
      
};