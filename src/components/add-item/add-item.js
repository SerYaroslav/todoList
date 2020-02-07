import React, {Component} from 'react';

import './add-item.css';

export default class AddItem extends Component {

  state = {
    label: ''
  }
  
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label:''
    });
  };
  
  render(){
    return (
      <form className='item-add-form d-flex'
            onSubmit={this.onSubmit}>
        <input type="text"
               className='form-control text-field'
               onChange={this.onLabelChange}
               placeholder='What do you want to do?'
               value={this.state.label}/>
        <button type='submit' className='btn btn-outline-secondary add-button'>
          Add item
        </button>
      </form>
    );
  }
};

