// 2017 annex b / Object.prototype getter/setter methods / __defineSetter__, ToObject(this)
module.exports = () => {
  var key = '__accessors_test__';
  __defineSetter__.call(1, key, function(){});
  try {
    __defineSetter__.call(null, key, function(){});
  } catch(e){
    return true;
  }

};