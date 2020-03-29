/* eslint-disable radix */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContainer } from '../store';
import Preview from './preview/Preview';
import CodeBox from './CodeBox';
import ListOfComponents from './list/componentSection';
import ButtonBar from './ButtonBar';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // containers: [placeholderItem],
    };
    this.handleAddContainer = this.handleAddContainer.bind(this);
  }

  componentDidMount() {
    // check to see if any containers already exist - if not, make one
    if (!this.props.containers.length > 0) {
      this.handleAddContainer();
    }
  }

  handleAddContainer() {
    const containerLen = this.props.containers.length;
    let nextIdx;
    if (containerLen < 1) {
      nextIdx = '0';
    } else {
      let lastIdx = this.props.containers[containerLen - 1].i;
      nextIdx = `${parseInt(lastIdx) + 1}`;
    }
    console.log('clicking add container button');
    const newItem = {
      i: nextIdx,
      x: 0,
      y: Infinity,
      w: 4,
      h: 2,
    };
    this.props.addContainer(newItem);
    // this.setState(prevState => {
    //   return { containers: [...prevState.containers, newItem] };
    // });
  }

  render() {
    return (
      <div>
        <ButtonBar addContainer={this.handleAddContainer} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr 3fr',
            gridGap: 12,
          }}
        >
          <ListOfComponents />
          {/* <Preview containers={this.state.containers} /> */}
          <Preview />
          <CodeBox key={this.props.code.length} code={this.props.code} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    components: state.component.allComponents,
    containers: state.containers,
    code: '',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addContainer: container => dispatch(addContainer(container)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
