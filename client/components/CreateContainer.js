import React, { Component } from 'react';

export default class CreateContainer extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  clicked() {
    console.log('the button was clicked');
  }
  handleClick(e) {
    // this.setState((prev))
  }
  render() {
    return (
      <div>
        {/* <p>test file for button</p> */}

        <button onClick={this.clicked}> Create Container </button>

        {/* <div className="w3-container w3-red">
          <h1>Header</h1>
        </div> */}

        {/* <div className="container">
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
        </div> */}
      </div>
    );
  }
}
