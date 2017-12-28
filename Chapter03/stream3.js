// Attempt, part III
console.log('Copying...');
fs.readFileAsync('source.bin').then((block) => {
  console.log('Size: ' + block.length);
  return fs.writeFileAsync('destination.bin', block);
}).then(() => {
 console.log('Done.');
}).catch((e) => {
  // handle errors
});