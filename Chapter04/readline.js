const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream("dictionary.txt"),
  terminal: false
});

rl.on("line", str => {
	console.log(str);
	setTimeout(() => { console.log("WHA?") }, 1000);
});

rl.on("pause", function() {
	console.log("pause");
});