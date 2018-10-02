const fs = require('fs');
const path = require('path');
const generateArtist = require('./fakeDataGenerator').generateArtist;


const chunkGenerator = (stream, index) => new Promise ((resolve, reject) => {
  for (let j = 0; j < index + 10; j += 1) {
    let artist = generateArtist(j);
    stream.write(artist, 'utf-8', () => {
      console.log(`generated ${index}`);
      stream.end(resolve);
    })
  }
});

const generatorLooper = async () => {
  let startIndex = 0;
  for (let i = 0; i < 1; i += 1) {
    // let artists = [];
    // for (let j = startIndex; j < startIndex + 10; j += 1) {
    //   artists.push(generateArtist(j));
    // }
    let stream = fs.createWriteStream(path.join(__dirname, 'json_data', `databeatz-data${i}.json`));
    // let json = JSON.stringify(artists, null, 2);
    await chunkGenerator(stream, startIndex);
    // startIndex += 10000;
  }
}

// generatorLooper();
console.log(generateArtist(0));