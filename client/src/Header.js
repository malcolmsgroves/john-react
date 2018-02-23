import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './Header.css';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewToiletForm: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleClick() {
    this.setState({
      viewToiletForm: true,
    });
  }
  onSubmit(state) {
    this.setState({
      viewToiletForm: false,
    })
    this.props.onSubmit(state);
  }
  render() {
    const viewToiletForm = this.state.viewToiletForm;
    return (
      <ButtonToolbar className="navbar">
        {viewToiletForm ?  (<ToiletForm onSubmit={this.onSubmit}/>) : (<NewToilet onClick={this.handleClick}/>)}
      </ButtonToolbar>
    );
  }
}

function NewToilet(props) {
  return (
    <Button className="center"
      bsStyle="primary"
      onClick={props.onClick}>
      New Toilet
    </Button>
  )
}

class ToiletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      rating: 5,
      toilet_type: 5,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit() {
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form className="toilet-form center">
        <div className="form-element">
          <label className="toilet-label">Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className="form-element">
          <label className="toilet-label">Description</label>
          <input type="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
        </div>
        <div className="form-element">
          <select name="type" onChange={this.handleChange}>
            <option value="1">1 - Unspeakable</option>
            <option value="2">2 - Rather use the woods</option>
            <option value="3">3 - Servicable</option>
            <option value="4">4 - Suitable for children</option>
            <option value="5">5 - Mom cleaned</option>
          </select>
        </div>
        <div className="form-element">
          <label className="toilet-label">Rating</label>
          <input type="number" name="rating" value={this.state.rating} onChange={this.handleChange} />
        </div>
        <div className="form-element">
          <Button bsStyle="success" onClick={this.handleSubmit}>Submit</Button>
        </div>
      </form>
    )
  }
}

export default Header;
