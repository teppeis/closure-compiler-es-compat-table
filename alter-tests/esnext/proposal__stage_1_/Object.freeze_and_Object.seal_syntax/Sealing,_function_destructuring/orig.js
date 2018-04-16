// proposal (stage 1) / Object.freeze and Object.seal syntax / Sealing, function destructuring
module.exports = () => {
function foo({| bar, baz |}) {
return bar + baz;
}
if (foo({ bar: 1, baz: 2 }) !== 3) return;
try {
foo({ bar: 1, fuz: 2 });
} catch (e) {
return true;
}

};