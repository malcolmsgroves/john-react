import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import Toilet from './toilet';
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
    if(index === this.state.active) {
      this.setState( { active: -1 } );
    }
    else {
      this.setState( { active: index });
    }
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

function ToiletElement(props) {
  const imgURL = `https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7C${props.toilet.lat},${props.toilet.lng}&markers=color:green%7C${props.currentCoords.latitude},${props.currentCoords.longitude}&size=400x400&scale=2&key=AIzaSyBHyQP8xlcgazFtPSs6CuP776FnUYFVAXc`;
  return (
    <ListGroupItem active={props.active}
      onClick={props.onClick}>
      <h3>{props.toilet.name}</h3>
      <p>{props.toilet.description}</p>
      <span>{props.toilet.rating}</span>
      {props.active &&
        (<div className="static-map">
          <img src={imgURL} alt="static map"/>
        </div>
        )
      }
    </ListGroupItem>
  )
}

export default ToiletIndex;
