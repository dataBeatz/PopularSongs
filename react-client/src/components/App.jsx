import React from 'react';
import axios from 'axios';
import Song from './Song.jsx';
import styles from '../styles/App.css';
import CSSModules from 'react-css-modules';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artistID: null,
      albumID: null,
      songID: null,
      popularSongs: [],
      albumCovers: [],
      showMore: false,
      artistObj: null
    };
}

  componentDidMount() {
    var randNum = Math.floor(Math.random() * 100) + 1;
    this.setState({artistID: randNum});
   
    axios.get(`http://localhost:3003/artist/id`,{params: {id: 1}})
      .then(response => {

        let data = response.data;
        this.setState({artistObj: data});

        let arrImg = [data.albums[0].img, data.albums[1].img, data.albums[2].img];

        this.setState({albumCovers: arrImg});

        let albumOne = data.albums[0].songs.map(e => [0,e]);
        let albumTwo = data.albums[1].songs.map(e => [1,e]);
        let albumThree = data.albums[2].songs.map(e => [2,e]);
        let allSongs = albumOne.concat(albumTwo, albumThree);

        allSongs.sort((a,b) => {
          if (a[1].popularity > b[1].popularity)
            return -1;
          if (a[1].popularity < b[1].popularity)
            return 1;
          return 0;
        });

        allSongs = allSongs.slice(0,10);

        this.setState({popularSongs: allSongs});
      })

      .catch(error => {
        console.log(error);
      });
  }

  createListOfSongs () {
    return this.state.popularSongs.map((e,i) => <Song key={e[1]._id} counter={i+1} albumURL={this.state.albumCovers[e[0]]} library={e[1].library} songName={e[1].name} streams={e[1].streams}/>);
  }

  fiveBestSongs () {
    return this.createListOfSongs().slice(0,5);
  }

  render () {

    return (
      //<div className={"container-fluid popular-songs"}>
      <div className={"container-fluid"} styleName={"popular-songs"}>
        <div className={"row"}> 
          <div className={"col"}> 
              <h3 className={"text-center"}>Popular</h3>
          </div> 
        </div>

        {this.state.showMore ? this.createListOfSongs() : this.fiveBestSongs()}

        <div className={"row"}>
            <div className={"col col-lg-1"}></div>
            <div className={"col"}>
                <button styleName={"spfy-btn"} className={"mt-5"} type={"button"} onClick={() => {this.setState({showMore: !this.state.showMore})}}>SHOW 5 MORE</button>
            </div>
            <div className={"col col-lg-1"}></div>
        </div>
      </div> 

      
    );
  }
}

//export default App;
export default CSSModules(App, styles);



      

        
        
        
    