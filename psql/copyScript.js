const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'kcheez',
  password: 'null',
  database: 'databeatz',
  port: '5432'
});


const copyArtist = (index) => new Promise((resolve, reject) => {
  pool.query(`copy (SELECT * FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN ${1 + (100000 * index)} AND ${100000 + (100000 * index)}) to '/Users/kcheez/Desktop/csv/databeatz${index}.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
      console.log('success with index ' + index);
      resolve();
  })
});

const loopDbToCSV = async () => {
  let page = 1;
  for (let i = 0; i < 100; i += 1) {
    await copyArtist(i);
    page += 1;
  }
  pool.end();
}

loopDbToCSV();


copy (SELECT * FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 2000001 AND 2500000) to '/Users/kcheez/Desktop/csv/databeatz6.csv' DELIMITER ',' CSV HEADER;

copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 1 AND 30000) to '/Users/kcheez/Desktop/csv/databeatz1.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 30001 AND 60000) to '/Users/kcheez/Desktop/csv/databeatz1.csv' DELIMITER ',' CSV HEADER;

copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 60001 AND 90000) to '/Users/kcheez/Desktop/csv/databeatz2.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 90001 AND 120000) to '/Users/kcheez/Desktop/csv/databeatz3.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 120001 AND 150000) to '/Users/kcheez/Desktop/csv/databeatz4.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 150001 AND 180000) to '/Users/kcheez/Desktop/csv/databeatz5.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 210001 AND 240000) to '/Users/kcheez/Desktop/csv/databeatz6.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 240001 AND 270000) to '/Users/kcheez/Desktop/csv/databeatz7.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, albums.album_id, album_name, albums.img, albums.publishdate, songs.song_id, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 270001 AND 300000) to '/Users/kcheez/Desktop/csv/databeatz8.csv' DELIMITER ',' CSV HEADER;

copy (SELECT artists.artist_id, artists.artist_name, album_name, albums.img, albums.publishdate, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 2500001 AND 5000000) to '/Users/kcheez/Desktop/csv/databeatz2.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, album_name, albums.img, albums.publishdate, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 5000001 AND 7500000) to '/Users/kcheez/Desktop/csv/databeatz3.csv' DELIMITER ',' CSV HEADER;
copy (SELECT artists.artist_id, artists.artist_name, album_name, albums.img, albums.publishdate, songs.song_name, songs.streams, songs.length, songs.popularity, songs.library FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 7500001 AND 10000000) to '/Users/kcheez/Desktop/csv/databeatz4.csv' DELIMITER ',' CSV HEADER;
copy (SELECT * FROM artists INNER JOIN albums ON artists.artist_id = albums.artist_id INNER JOIN songs ON albums.album_id = songs.album_id WHERE artists.artist_id BETWEEN 750
  

  artist_id,
  artist_name,
  album_id,
  album_name,
  img,
  publishdate,
  song_id,
  song_name,
  streams,
  length,
  popularity,
  library,



  COPY artists FROM '/Users/kcheez/Destop/csv/databeatz1.csv' WITH DELIMITER=',' AND HEADER=TRUE;


  java -jar cassandra-loader -f /Users/Desktop/csv/databeatz1.csv -host 127.0.0.1 -skipRows 1 -progressRate -schema “databeatz.artists(artist_id, artist_name, album_name, img, publishdate, song_id, song_name, streams, length, popularity, library)”