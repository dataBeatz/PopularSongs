const fs = require('fs');
const path = require('path');
const generateArtist = require('./dataGenerator/fakeCSVGenerator.js').generateArtist;
const generateAlbum = require('./dataGenerator/fakeCSVGenerator.js').generateAlbum;
const generateSong = require('./dataGenerator/fakeCSVGenerator.js').generateSong;


// const artistChunkGenerator = (stream, artists, index) => new Promise ((resolve, reject) => {
//   stream.write(artists, 'utf-8', () => {
//     console.log(`generated ${index}`);
//     stream.end(resolve);
//   })
// });

// const artistGeneratorLooper = async () => {
//   let startIndex = 0;
//   for (let i = 0; i < 10; i += 1) {
//     let artists = 'name\n';
//     for (let j = startIndex; j < startIndex + 1000000; j += 1) {
//       artists += `${generateArtist()}\n`;
//     }
//     let stream = fs.createWriteStream(path.join(__dirname, 'csv_data', 'artists', `databeatz-artists${i}.csv`));
//     await artistChunkGenerator(stream, artists, startIndex + 1000000);
//     startIndex += 1000000;
//   }
// }

// artistGeneratorLooper();

// const albumChunkGenerator = (stream, albums, index) => new Promise ((resolve, reject) => {
//   stream.write(albums, 'utf-8', () => {
//     console.log(`generated ${index}`);
//     stream.end(resolve);
//   })
// });

// const albumGeneratorLooper = async () => {
//   let startIndex = 0;
//   for (let i = 0; i < 100; i += 1) {
//     let albums = 'name,img,publishdate,artist_id\n';
//     for (let j = startIndex; j < startIndex + 100000; j += 1) {
//       for (let k = 0; k < 3; k += 1) {
//         albums += `${generateAlbum(j + 1)}\n`;
//       }
//     }
//     let stream = fs.createWriteStream(path.join(__dirname, 'csv_data', 'albums', `databeatz-albums${i}.csv`));
//     await albumChunkGenerator(stream, albums, startIndex + 100000);
//     startIndex += 100000;
//   }
// }

// albumGeneratorLooper();

// const songChuckGenerator = (stream, songs, index) => new Promise ((resolve, reject) => {
//   stream.write(songs, 'utf-8', () => {
//     console.log(`generated ${index}`);
//     stream.end(resolve);
//   })
// });

// const songGeneratorLooper = async () => {
//   let startIndex = 0;
//   let songs = 'name,streams,length,popularity,library,album_id\n';
//   for (let i = 0; i < 1000; i += 1) {
//     for (let j = startIndex; j < startIndex + 30000; j += 1) {
//       for (let k = 0; k < 10; k += 1) {
//         songs += `${generateSong(j + 1)}\n`;
//       }
//     }
//     let stream = fs.createWriteStream(path.join(__dirname, 'csv_data', 'songs', `databeatz-songs.csv`), {"flags": "a"});
//     await songChuckGenerator(stream, songs, startIndex + 30000);
//     startIndex += 30000;
//   }
// }

// songGeneratorLooper();

const wholeCsvChunkGenerator = (stream, discography, index) => new Promise ((resolve, reject) => {
  stream.write(discography, 'utf-8', () => {
    console.log(`generated ${index}`);
    stream.end(resolve);
  })
});

const wholeCsvGeneratorLooper = async () => {
  let startIndex = 0;
  for (let i = 0; i < 1000; i += 1) {
    let discography = 'artist_id,artist_name,album_name,img,publish_date,song_name,streams,length,popularity,library,\n';
    for (let j = startIndex; j < startIndex + 10000; j += 1) {
      let artist = `${generateArtist(j)}`
      for (let k = 0; k < 3; k += 1) {
        let album = `${generateAlbum()}`;
        for (let k = 0; k < 10; k += 1) {
          discography += `${artist},${album},${generateSong()}\n`;
        }
      }
    }
    let stream = fs.createWriteStream(path.join(__dirname, 'csv_data',`databeatz0.csv`), {"flags": "a"});
    await wholeCsvChunkGenerator(stream, discography, startIndex);
    startIndex += 10000;
  }
}

wholeCsvGeneratorLooper();