import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preview from './preview/Preview';
import CodeBox from './CodeBox';
import ListOfComponents from './list/componentSection';

class MainPage extends Component {
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gridGap: 20,
        }}
      >
        <ListOfComponents />
        <Preview />
        <CodeBox key={this.props.code.length} code={this.props.code} />
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
