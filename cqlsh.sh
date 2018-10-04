CREATE TABLE artists (
  artist_id int,
  artist_name text,
  album_id int,
  album_name text,
  img text,
  publishdate int,
  song_id int,
  song_name text,
  streams int,
  length int,
  popularity int,
  library boolean,
  primary key (artist_id, album_id, song_id)
);
artist_id,artist_name,img,publishdate,song_name,streams,length,popularity,library
CREATE TABLE artists (
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
)


COPY artists(  artist_id,
  artist_name,
  album_name,
  img,
  publishdate,
  song_id,
  song_name,
  streams,
  length,
  popularity,
  library) FROM '/Users/kcheez/Desktop/csv/databeatz1.csv' WITH DELIMITER=',' AND HEADER=TRUE;


  create keyspace databeatz with replication = {'class': 'SimpleStrategy', 'replication_factor': 1};