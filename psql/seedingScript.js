const { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
  host: 'localhost',
  user: 'kcheez',
  password: 'null',
  database: 'databeatz',
  port: '5432'
});
// const filePath = path.join(__dirname, );

// const seedArtistCSV = (page) => new Promise((resolve, reject) => {
//   pool.query(`copy artists(name) from '/Users/kcheez/Desktop/Code/hrsf/dataBeatz/PopularSongs/csv_data/artists/databeatz-artists${page}.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
//     if(err) {
//       console.log('error copying ' + page);
//       reject(err);
//     } else {
//       console.log('success with page ' + page);
//       resolve();
//     }
//   })
// });

// const seedAlbumCSV = (page) => new Promise((resolve, reject) => {
//   pool.query(`copy albums(name, img, publishdate, artist_id) from '/Users/kcheez/Desktop/Code/hrsf/dataBeatz/PopularSongs/csv_data/albums/databeatz-albums${page}.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
//     if(err) {
//       console.log('error copying ' + page);
//       reject(err);
//     } else {
//       console.log('success with page ' + page);
//       resolve();
//     }
//   })
// });

const seedSongCSV = (page) => new Promise((resolve, reject) => {
  pool.query(`copy songs(name, streams,  length,popularity, library, album_id) from '/Users/kcheez/Desktop/Code/hrsf/dataBeatz/PopularSongs/csv_data/songs/databeatz-songs${page}.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
    if(err) {
      console.log('error copying ' + page);
      reject(err);
    } else {
      console.log('success with page ' + page);
      resolve();
    }
  })
});

const loopThruCSV = async () => {
  let page = 0
  for (let i = 0; i < 1000; i += 1) {
    await seedSongCSV(page);
    page += 1;
  }
  pool.end();
  console.log('complete!')
}

loopThruCSV();