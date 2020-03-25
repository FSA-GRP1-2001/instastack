import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preview from './preview/Preview';
import CodeBox from './CodeBox';
import ListOfComponents from './list/componentSection';
import CreateContainer from './CreateContainer';

const placeholderItem = {
  x: 0,
  y: 0,
  w: 3,
  h: 2,
};

import ButtonBar from './ButtonBar';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      containers: [placeholderItem],
    };
    this.addContainer = this.addContainer.bind(this);
  }

  addContainer() {
    console.log('clicking add container button');
    const newItem = {
      x: 3,
      y: 2,
      w: 1,
      h: 2,
    };
    this.setState(prevState => {
      return { containers: [...prevState.containers, newItem] };
    });
  }

  render() {
    return (
      <div>
        <CreateContainer addContainer={this.addContainer} />
        <ButtonBar />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr',
            gridGap: 20,
          }}
        >
          <ListOfComponents />
          <Preview containers={this.state.containers} />
          <CodeBox key={this.props.code.length} code={this.props.code} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    components: state.component.allComponents,
    code: '',
  };
};

export default connect(mapStateToProps)(MainPage);
