import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const styles = {
  container: {
    padding: 5,
    overflow: 'auto',
  },
};

class CodeBox extends Component {
  // updateCode(newCode) {
  //   this.setState({ code: newCode });
  // }
  // ref = React.createRef()
  render() {
    const options = {
      lineNumbers: true,
      theme: 'material',
      mode: 'htmlmixed',
    };
    return (
      <div style={styles.container}>
        <CodeMirror
          editorDidMount={editor => {
            this.instance = editor;
          }}
          value={this.props.code}
          // onBeforeChange={(editor, data, code) => {
          //   this.setState({ code });
          // }}
          onChange={(editor, data, code) => {
            console.log('controlled', { code });
          }}
          options={options}
          // ref={editor}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    code: state.code,
  };
};

export default connect(mapStateToProps)(CodeBox);
