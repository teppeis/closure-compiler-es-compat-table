// functions / class / computed names, temporal dead zone
module.exports = () => {
  try {
    var B = class C {
      [C](){}
    }
  } catch(e) {
    return true;
  }

};