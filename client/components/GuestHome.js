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
export default class GuestHome extends Component {
  render() {
    //let display = '(!instaChallenge) => {build your HTML view in < 5 mins);';
    //<h1>{display}</h1>
    return (
      <div className="mainpage">
        <center>
          <img src="/img/text-621x103.png" width="621" height="103" />
        </center>
        <h3>Choose a template to get started:</h3>
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

        <div className="about">
          <div className="profile-grid">
            <Grid fluid>
              <Row around="xs">
                <Col md>
                  <img src="/headshots/Tina.jpg" width="100" height="100" />
                  <div>Amantina Sosa</div>
                </Col>
                <Col md>
                  <img src="/headshots/Max.jpg" width="100" height="100" />
                  <div>Maxwell Han</div>
                </Col>
              </Row>
              <Row around="xs">
                <Col md>
                  <img src="/headshots/Mercedes.jpg" width="100" height="100" />
                  <div>Mercedes Madanire</div>
                </Col>
                <Col md>
                  <img src="/headshots/Josh.jpg" width="100" height="100" />
                  <div>Joshua Skootsky</div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div className="about-text">
            <h5>ABOUT INSTASTACK</h5>
            <h1>
              Instastack is a rapid prototyping tool to build a project in less
              than 5 mins. with a custom look & feel.
            </h1>
            <p>
              InstaStack was created for the Capstone project at Fullstack
              Academy by Tina Sosa, Max Han, Mercedes Madanire, and Joshua
              Skootsky.
            </p>
            <p>
              We built the InstaStack application with Postgress, Sequelize,
              Express, React, and Redux. The front-end style is built with CSS
              and the PrimeReact library.
            </p>
            <p>You can learn more about the InstaStack applicaion on Github.</p>
          </div>
        </div>
      </div>
    );
  }
}
