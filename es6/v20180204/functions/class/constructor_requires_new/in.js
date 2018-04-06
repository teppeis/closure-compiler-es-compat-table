// functions / class / constructor requires new
module.exports = function() {
  class C {}
  try {
    C();
  }
  catch(e) {
    return true;
  }

};