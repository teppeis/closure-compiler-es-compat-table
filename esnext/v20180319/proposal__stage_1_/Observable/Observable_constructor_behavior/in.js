// proposal (stage 1) / Observable / Observable constructor behavior
module.exports = () => {
  if(!(new Observable(function(){}) instanceof Observable))return false;
  var nonCallableCheckPassed,
    primitiveCheckPassed,
    newCheckPassed;
  try { new Observable({ }) } catch(e) { nonCallableCheckPassed = true }
  try { new Observable(false) } catch(e) { primitiveCheckPassed = true }
  try { Observable(function() { }) } catch(e) { newCheckPassed = true }
  return nonCallableCheckPassed && primitiveCheckPassed && newCheckPassed;

};