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
    }
    this.onToiletSubmit     = this.onToiletSubmit.bind(this);
    this.componentDidMount  = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let object = this;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        object.setState({
          currentCoords: position.coords,
        })
      }, function(error) {
        alert(error);
      }, {enableHighAccuracy: true, maximumAge: 0});
    }
  }

  onToiletSubmit(form) {
    let toilets = this.state.toilets;
    toilets.unshift(new Toilet(form, this.state.currentCoords));
    this.setState({
      toilets: toilets,
    })

  }

  loadToilets() {

  }

  render() {
    return (
      <div className="App">
        <Header onSubmit={this.onToiletSubmit}/>
        <ToiletIndex currentCoords={this.state.currentCoords} toilets={this.state.toilets} />
      </div>
    );
  }
}

export default App;
