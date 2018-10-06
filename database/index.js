const pg = require('pg');
const config = require('./config.js');
const pool = new pg.Pool(config);

const db = pool.connect()
  .then(() => console.log('connected'))
  .catch((err) => console.log(err)); 


// const getQuery = `SELECT * FROM artists 
//                   INNER JOIN albums ON artists.artist_id = albums.artist_id 
//                   INNER JOIN songs ON albums.album_id = songs.album_id 
//                   WHERE artists.artist_id = 1;`;
// // let artistID = parseInt(req.params.id, 10);
// pool.query(getQuery)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));


module.exports.db = db;
module.exports.pool = pool;