import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

const ClipButton = ({ code }) => {
  // Growl({});
  useEffect(() => {
    /// re-render this functional component if code updates
  }, [code]);

  // destructuring code off props
  // make a button that treats code as a string
  // copies string to clipboard on click
  let growl;
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      // toast !
      growl.show({
        severity: 'success',
        summary: 'Copied!',
        detail: 'Copied code to clipboard',
      });
    } catch (error) {
      console.error('Failed to copy from clipboard ', err);
    }
  }

  return (
    <>
      <Growl ref={el => (growl = el)}></Growl>
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
