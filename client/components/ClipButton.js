import React, { useState } from 'react';
import { connect } from 'react-redux';

const ClipButton = ({ code }) => {
  // destructuring code off props
  // make a button that treats code as a string
  // copies string to clipboard on click
  async function copyToClipboard() {
    var promise = await navigator.clipboard.writeText(code);
    if (promise) {
      // do fancy toast stuff
    }
  }
  code = 'testing testing 123';
  console.log('code in Clip Button: ', code);
  return (
    <>
      {document.queryCommandSupported('copy') && (
        <div>
          <button onClick={() => copyToClipboard} type="button">
            Copy Code to Clipboard
          </button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    code: state.code,
  };
};

export default connect(mapStateToProps)(ClipButton);
