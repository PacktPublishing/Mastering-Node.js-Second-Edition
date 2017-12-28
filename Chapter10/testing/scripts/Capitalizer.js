
module.exports = function() {
	this.capitalize = str => {
		return str.split('').map(char => char.toUpperCase()).join('');
	};
};