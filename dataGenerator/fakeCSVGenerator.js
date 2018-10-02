const faker = require('faker');


// generate random number 0-999

const picIndex = () => {
  return Math.floor(Math.random() * 999);
};

const generateSong = () => {
  // song structure = name, streams, length, popularity, library, albumId
  song = `${faker.lorem.words()},${Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000},${Math.floor(Math.random() * (300 - 210 + 1)) + 210},${Math.floor(Math.random() * 20) + 1},${Math.random() >= 0.5}`;
  return song;
};

const generateAlbum = () => {
  // album structure = name, img, publish, artistId
  let album = `${faker.lorem.words()},https://s3.amazonaws.com/databeatz/${picIndex()}.webp,${Math.floor(Math.random() * (2018 - 1920 + 1)) + 1920}`;
  return album;
};


const generateArtist = (artistId) => {
  let artist = `${artistId},${faker.lorem.word()}`;
  return artist;
};

module.exports.generateArtist = generateArtist;
module.exports.generateAlbum = generateAlbum;
module.exports.generateSong = generateSong;
