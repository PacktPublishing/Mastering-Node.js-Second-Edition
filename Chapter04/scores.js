const fs = require('fs');
const readline = require('readline');

let cells = 186; // 6 x 31
let buffer = Buffer.alloc(cells);

while(cells--) {
	// 0, 1 or greater
	var rand = Math.floor(Math.random() * 3);
	
	// 78 = "N", 87 = "W", 76 = "L"
	buffer[cells] = rand === 0 ? 78 : rand === 1 ? 87 : 76;
}

fs.open("scores.txt", "r+", (err, fd) => {
	fs.write(fd, buffer, 0, buffer.length, 0, err => {
	
		let rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		
		let quest = () => {
			rl.question("month/day:", index => {
				if(!index) {
					return rl.close();
				}
		
				let md = index.split('/');
				let pos = parseInt(md[0] -1) * 31 + parseInt(md[1] -1);
				
				fs.read(fd, Buffer.alloc(1), 0, 1, pos, (err, br, buff) => {
					let v = buff.toString();
					console.log(v === "W" ? "Win!" : v === "L" ? "Loss..." : "No game");
					quest();
				});
			});
		};
		
		quest();
	});
});