import React, { Component } from 'react';
import Header from './Header';
import ToiletIndex from './ToiletIndex';
import Toilet from './toilet';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toilets: [],
      currentCoords: {},
      page: 1,
      loading: false,
    }
    this.onToiletSubmit     = this.onToiletSubmit.bind(this);
    this.loadToilets        = this.loadToilets.bind(this);
    this.setInfiniteScroll  = this.setInfiniteScroll.bind(this);
  }

  componentDidMount() {
    let object = this;
    this.getLocation()
      .then(coords => {
        object.setState({
          currentCoords: coords,
        })
      })
      .then(this.loadToilets)
      .then(this.setInfiniteScroll)
      .catch(error => console.log(error))
  }

  setInfiniteScroll() {
    const obj = this;
    document.addEventListener('scroll', function() {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight
          && !obj.state.loading) {
        obj.setState({ loading: true })
        obj.loadToilets()
      }
    });
  }

  getLocation() {
    const promise = new Promise((resolve, reject) => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            resolve(position.coords);
          },
          function(error) {
            reject(error);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        )
      }
      else {
        reject("navigator.geolocation not available");
      }
    });
    return promise;
  }

  onToiletSubmit(form) {
    const toilet = Object.assign(form, {
        lat: this.state.currentCoords.latitude,
        lng: this.state.currentCoords.longitude,
    });
    fetch('/api/toilets', {
      body:    JSON.stringify(toilet),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })
    .then(() => {
      let toilets = this.state.toilets;
      toilets.unshift(new Toilet(toilet));
      this.setState({
        toilets: toilets,
      })
    })
    .catch(error => console.log(error))
  }

  loadToilets() {
    const lat = this.state.currentCoords.latitude;
    const lng = this.state.currentCoords.longitude;
    fetch(`/api/toilets?lat=${lat}&lng=${lng}&page=${this.state.page}`)
      .then(response => response.json())
      .then(data => {
        let toilets = this.state.toilets;
        let keys = Object.keys(data);
        if(keys.length === 0) return;
        for(let i in keys) {
          let toilet = data[i];
          toilets.push(new Toilet(toilet));
        }
        this.setState({
          toilets: toilets,
          page: this.state.page + 1,
          loading: false,
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Header onSubmit={this.onToiletSubmit}/>
        <ToiletIndex currentCoords={this.state.currentCoords} toilets={this.state.toilets} />
        {!this.state.loading &&
          <div>Loading</div>
        }
      </div>
    );
  }
}

export default App;
