const fs = require('fs');
const path = require('path');
const generateArtist = require('./fakeDataGenerator').generateArtist;


const chunkGenerator = (stream, json, index) => new Promise ((resolve, reject) => {
  stream.write(json, 'utf-8', () => {
    console.log(`generated ${index}`);
    stream.end(resolve);
  })
});

const generatorLooper = async () => {
  let startIndex = 0;
  for (let i = 0; i < 1000; i += 1) {
    let artists = [];
    for (let j = startIndex; j < startIndex + 10000; j += 1) {
      artists.push(generateArtist(j));
    }
    let stream = fs.createWriteStream(path.join(__dirname, 'seed_data', `databeatz-data${i}.json`));
    let json = JSON.stringify(artists, null, 2);
    await chunkGenerator(stream, json, startIndex + 10000);
    startIndex += 10000;
  }
}

generatorLooper();