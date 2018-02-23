import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './ToiletIndex.css';


class ToiletIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: -1,
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  handleToggle(index, e) {

    this.setState( { active: index });

  }
  componentWillReceiveProps() {
    this.setState( { active: -1 } );
  }
  render() {
    const obj = this;
    const listItems = this.props.toilets.map(function(toilet, index) {
      const active = obj.state.active;
      return (
        <ToiletElement
          key={index}
          toilet={toilet}
          active={index === active}
          currentCoords={obj.props.currentCoords}
          onClick={obj.handleToggle.bind(this, index)}/>
      )
    });
    return <ListGroup id="toilet-list">{listItems}</ListGroup>;
  }

}

class ToiletElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    const review = {
      toilet_id:  this.props.toilet.id,
      rating:     this.state.rating,
    }
    fetch('/api/reviews', {
      body:    JSON.stringify(review),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })
  }

  render() {
    const imgURL = `https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7C${this.props.toilet.lat},${this.props.toilet.lng}&markers=color:green%7C${this.props.currentCoords.latitude},${this.props.currentCoords.longitude}&size=400x400&scale=2&key=AIzaSyBHyQP8xlcgazFtPSs6CuP776FnUYFVAXc`;
    return (
      <ListGroupItem active={this.props.active}
        onClick={this.props.onClick}>
        <h3>{this.props.toilet.name}</h3>
        <p>{this.props.toilet.description}</p>
        <span>{this.props.toilet.rating}</span>
        {this.props.active && (
          <div className="inset">
            <div className="static-map">
              <img src={imgURL} alt="static map"/>
            </div>

            <form>

              <span className="form-element">
                <label className="toilet-label">Rating</label>
                <select name="rating" onChange={this.handleChange} value={this.state.rating}>
                  <option value="1">1 - Unspeakable</option>
                  <option value="2">2 - Rather use the woods</option>
                  <option value="3">3 - Servicable</option>
                  <option value="4">4 - Suitable for children</option>
                  <option value="5">5 - Mom cleaned</option>
                </select>
              </span>

              <span className="form-element">
                <input className="btn btn-success" onClick={this.handleSubmit} value="Submit" type="submit"/>
              </span>

            </form>
          </div>

        )}
      </ListGroupItem>
    )
  }

}

export default ToiletIndex;
