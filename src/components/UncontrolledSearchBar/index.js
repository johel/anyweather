import React, {Component} from 'react';
import styles from './style.css';

class UncontrolledSearchBar extends Component {
  constructor(props){
    super(props);  
    this.onClick = this.onClick.bind(this); 
    this.onKeyPress = this.onKeyPress.bind(this); 
  }

  onClick(e) {
    const input = this.refs.myInput;  
    const value = input.value;  
    this.props.onSearch(value);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSearch(e.target.value);
    }
  }

  render(){
  	let {wrapperClassName} = this.props;

    return(
  	<div className={wrapperClassName? wrapperClassName : "searchDefaultWrapper"}>
      <div className="search">
        <input ref="myInput" type="text" className="search__input" onKeyPress={this.onKeyPress} placeholder="Search anywhere" />
        <button className="search__button" onClick={this.onClick}>
          <i className="fa fa-search search__icon"></i>
        </button>
      </div>
    </div>
    )
  }

}

export default UncontrolledSearchBar;