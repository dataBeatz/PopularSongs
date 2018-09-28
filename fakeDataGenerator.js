const faker = require('faker');
const fs = require('fs');
const path = require('path');

// generate random number 0-999

const picIndex = () => {
  return Math.floor(Math.random() * 999);
};

const generateSong = (id) => {
  return {
    id: id,
    name: faker.lorem.words(),
    streams: Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000,   // streams between 50mm and 250mm
    length: Math.floor(Math.random() * (300 - 210 + 1)) + 210,   // length between 5 min and 3.5 min
    popularity: Math.floor(Math.random() * 20) + 1,   // popularity scale between 1 and 20 - used to select most popular songs
    library: Math.random() >= 0.5   // whether song has been added to users library
  };
};

const generateAlbum = (id) => {
  let album = {
    id: id,
    name: faker.lorem.words(),
    img: `https://s3.amazonaws.com/databeatz/${picIndex()}.webp`, 
    publish: Math.floor(Math.random() * (2018 - 1920 + 1)) + 1920,   // published between 2018 and 1920
    songs: []
  };
  for (let i = 0; i < 10; i++) {
    album.songs.push(generateSong(i));
  }
  return album;
};


const generateArtist = (id) => {
  let artist = {
    id: id,
    name: faker.lorem.word(),
    albums: [] 
  };

  for (let i = 0; i < 3; i += 1) {
    artist.albums.push(generateAlbum(i));
  }
  return artist;
};

module.exports.generateArtist = generateArtist;
