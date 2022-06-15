// 2022 features / static class fields / static class fields use [[Define]]
module.exports = () => {
return (class X { static name = "name"; }).name === 'name';

};