// built-ins / Proxy / JSON.stringify support
module.exports = () => {
  return JSON.stringify(new Proxy(['foo'], {})) === '["foo"]';

};