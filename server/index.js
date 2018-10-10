require("newrelic");
const cluster = require("cluster");
const os = require("os");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database/index").db;
const pool = require("../database/index").pool;
const path = require("path");
const cors = require("cors");
const redis = require('redis');

const client = redis.createClient();
const app = express();

const getArtist = (req, res) => {
  const artistId = req.params.id;
  const getQuery = `SELECT * FROM artists 
  INNER JOIN albums ON artists.artist_id = albums.artist_id 
  INNER JOIN songs ON albums.album_id = songs.album_id 
  WHERE artists.artist_id = ${artistId};`;
  pool
    .query(getQuery)
    .then(data => {
      let songs = data.rows;
      res.status(200).json(songs);
      client.setex(artistId, 3600, JSON.stringify(songs));
    })
    .catch(err => console.log(err));
};

const getCache = (req, res) => {
  client.get(req.params.id, (err, result) => {
    if (result) {
      res.status(200).json(JSON.parse(result));
    } else {
      getArtist(req, res);
    }
  });
};

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
}
else {
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../public/")));
  
  app.get("/artist/:id", getCache);
  
  // expect to receive {artistID, albumID, songID, added -> bool either 1 or 0}
  // app.post('/artist/', function (req, res) {
  //   let update = {};
  //   var objProp = `albums.${req.body.albumID}.songs.${req.body.songID}.library`;
  //   update[objProp] = !!parseInt(req.body.added, 10);
  
  //   db.findOneAndUpdate({id: req.body.artistID}, {$set:update})
  //   // TO DO: get current boolean value from db and send back along with mssg
  //     .then(() => res.json({message: 'success', added: !!parseInt(req.body.added,10)}))
  //     .catch(() => res.status(400).json({message: 'bad request'}));
  // });
  
  // app.put('/artist/:id', (req, res) => {
  //   let artistID = parseInt(req.params.id, 10);
  
  //   res.end();
  // });
  
  // app.delete('/artist/:id', (req, res) => {
  //   let artistID = parseInt(req.params.id, 10);
  
  //   db.deleteOne({ id: artistID })
  //     .then(() => res.json({message: 'success'}))
  //     .catch(() => res.status(400).json({message: 'bad request'}));
  // });
  
  const PORT = 1177;
  
  app.listen(PORT, function() {
    console.log(`listening on port ${PORT}!`);
  });

}

cluster.on('exit', (worker) => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!')
  cluster.fork();
});
