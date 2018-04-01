// built-ins / Proxy / no "prototype" property
module.exports = function() {
new Proxy({}, {});
        return !Proxy.hasOwnProperty('prototype');
      
};