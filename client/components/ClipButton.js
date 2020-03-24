import React, { useState } from 'react';
import { connect } from 'react-redux';

const ClipButton = ({ code }) => {
  // destructuring code off props
  // make a button that treats code as a string
  // copies string to clipboard on click

  const [copySuccess, setCopySuccess] = useState('');

  function copyToClipboard() {
    var promise = navigator.clipboard.writeText(code);
  }

  return (
    <>
      {document.queryCommandSupported('copy') && (
        <div>
          <button onClick={copyToClipboard} type="button">
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
