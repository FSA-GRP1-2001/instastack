import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Row,
  Col,
  getRowProps,
  getColumnProps,
} from 'react-flexbox-grid';
import { Card } from 'primereact/card';
import temp from '../../public/temp.png';

// import temp from '../../public/temp.jpg';

export default class GuestHome extends Component {
  render() {
    let display = '(!instaChallenge) => {build your HTML view in < 5 mins);';
    return (
      <div className="guest-hp">
        <center>
          <h1>{display}</h1>
        </center>
        <div className="templates-grid">
          <Card className="template-card" footer="go to template">
            Content
          </Card>
          <Card className="template-card" footer="go to template">
            Content
          </Card>
          <Card className="template-card" footer="go to template">
            Content
          </Card>
          <Card className="template-card" footer="go to template">
            Contents
          </Card>
        </div>
        <div className="bottom-half">
          <div className="profile-grid">
            <Grid fluid>
              <Row around="xs">
                <Col md>
                  <img src={temp} width="100" height="100" />
                  <div>Amantina Sosa</div>
                </Col>
                <Col md>
                  <img src={temp} width="100" height="100" />
                  <div>Maxwell Han</div>
                </Col>
              </Row>
              <Row around="xs">
                <Col md>
                  <img src={temp} width="100" height="100" />
                  <div>Mercedes Madanire</div>
                </Col>
                <Col md>
                  <img src={temp} width="100" height="100" />
                  <div>Joshua Skootsky</div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div className="about-text">
            <h5>ABOUT INSTASTACK</h5>
            <p>
              InstaStack was a capstone project created at Fullstack Academy by
              Tina Sosa, Max Han, Mercedes Madanire, and Joshua Skootsky.
            </p>
            <p>
              We built InstaStack with PostgreSql, Sequelize, Express, React,
              and Redux. The front-end includes components from the PrimeReact
              library
            </p>
            <p>
              You can learn more about the InstaStack application on our GitHub
            </p>
          </div>
        </div>
      </div>
    );
  }
}
