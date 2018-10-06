const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'kevin',
  password: 'password',
  database: 'databeatz',
  port: '5432'
});

pool.query(`create table artists (artist_id serial primary key, name varchar (50));
            create table albums (album_id serial primary key, name varchar (50), img varchar (255), publishDate int, artist_id integer references artists (id));
            create table songs (song_id serial primary key, name varchar (50), streams int, length int, popularity int, library bool, album_id integer references albums (id));
            `, (err) => {
  if (err) {
    console.log('error creating table');
  } else {
    console.log('table created');
  }
});