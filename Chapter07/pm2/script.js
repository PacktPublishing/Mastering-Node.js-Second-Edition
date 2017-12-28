// script.js
let count = 1;
function loop() {
  console.log(count++);
  setTimeout(loop, 1000);
}
loop();
