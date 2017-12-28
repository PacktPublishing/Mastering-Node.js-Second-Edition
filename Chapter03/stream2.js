// Attempt the second
console.log('Copying...');
fs.readFile('source.bin', null, (error1, block) => {
  if (error1) {
    throw error1;
  }
  console.log('Size: ' + block.length);
  fs.writeFile('destination.bin', block, (error2) => {
    if (error2) {
      throw error2;
    }
    console.log('Done.');
  });
});