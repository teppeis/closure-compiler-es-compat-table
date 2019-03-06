// functions / class / constructor requires new
module.exports = () => {
  class C {}
  try {
    C();
  }
  catch(e) {
    return true;
  }

};