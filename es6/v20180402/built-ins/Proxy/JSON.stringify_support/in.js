// built-ins / Proxy / JSON.stringify support
module.exports = function() {
  return JSON.stringify(new Proxy(['foo'], {})) === '["foo"]';

};