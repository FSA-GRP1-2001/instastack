import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Preview from './preview/Preview';
import LandingPageTemplatePreview from './LandingPageTemplatePreview';
import CodeBox from './CodeBox';
import ListOfComponents from './list/componentSection';
import ButtonBar from './ButtonBar';

const placeholderItem = {
  i: '0',
  x: 0,
  y: 0,
  w: 3,
  h: 2,
};

class LandingPageTemplate extends Component {
  constructor() {
    super();
    this.state = {
      containers: [placeholderItem],
    };
    this.addContainer = this.addContainer.bind(this);
  }

  addContainer() {
    const containerLen = this.state.containers.length;
    let nextIdx;
    if (containerLen < 1) {
      nextIdx = '0';
    } else {
      let lastIdx = this.state.containers[containerLen - 1].i;
      nextIdx = `${parseInt(lastIdx) + 1}`;
    }
    console.log('clicking add container button');
    const newItem = {
      i: nextIdx,
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
        <h2>For testing purposesssss</h2>

        <ButtonBar addContainer={this.addContainer} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr 3fr',
            gridGap: 12,
          }}
        >
          <ListOfComponents />
          {/* <Preview containers={this.state.containers} /> */}
          <LandingPageTemplatePreview containers={this.state.containers} />

          {/* <CodeBox key={this.props.code.length} code={this.props.code} /> */}
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

export default connect(mapStateToProps)(LandingPageTemplate);
