// async functions: async function prototype, Symbol.toStringTag
module.exports = function() {
return Object.getPrototypeOf(async function (){})[Symbol.toStringTag] == "AsyncFunction";
        
};