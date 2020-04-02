import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

export const Templates = () => {
  return (
    <>
      <div className="center-text">
        <h4>Choose a template:</h4>
      </div>
      <div className="templates">
        <div className="template-grid">
          <Grid fluid>
            <Row around="xs">
              <Col md>
                <Link to="/mainPage">
                  <img
                    className="img-fade"
                    src="/templates/t1.png"
                    width="130"
                    height="130"
                  />
                </Link>
              </Col>
              <Col md>
                <Link to="/blogtemplate">
                  <img
                    className="img-fade"
                    src="/templates/t2.png"
                    width="130"
                    height="130"
                  />
                </Link>
              </Col>
              <Col md>
                <Link to="/landingpagetemplate">
                  <img
                    className="img-fade"
                    src="/templates/t3.png"
                    width="130"
                    height="130"
                  />
                </Link>
              </Col>
              <Col md>
                <Link to="#">
                  <img
                    className="img-fade"
                    src="/templates/t4.png"
                    width="130"
                    height="130"
                  />
                </Link>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </>
  );
};
