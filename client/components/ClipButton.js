import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

const ClipButton = ({ code }) => {
  useEffect(() => {
    /// re-render this functional component if code updates
  }, [code]);

  // destructuring code off props
  // make a button that treats code as a string
  // copies string to clipboard on click
  async function copyToClipboard() {
    var promise = await navigator.clipboard.writeText(code);
    if (promise) {
      // do fancy toast stuff
      console.log('Clipped!');
    }
  }
  console.log('code in Clip Button: ', code);
  return (
    <>
      {document.queryCommandSupported('copy') && (
        <div>
          <Button
            onClick={copyToClipboard}
            label="Copy Code to Clipboard"
            className="p-button-raised"
          />
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
