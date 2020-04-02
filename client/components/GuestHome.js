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
        <div className="center-image">
          <img src="/img/text-621x103.png" width="621" height="103" />
        </div>
        <div className="center-text">
          <h4>Choose a template to get started:</h4>
        </div>
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
                  <img src="/headshots/Tina.jpg" width="130" height="130" />
                  <div className="names">Amantina Sosa</div>
                </Col>
                <Col md>
                  <img src="/headshots/Max.jpg" width="130" height="130" />
                  <div className="names">Maxwell Han</div>
                </Col>
              </Row>
              <Row around="xs">
                <Col md>
                  <a
                    href="https://www.linkedin.com/in/mercedesmadanire/"
                    target="blank"
                  >
                    <img
                      src="/headshots/Mercedes.jpg"
                      width="130"
                      height="130"
                    />
                  </a>
                  <div className="names">
                    <a
                      href="https://www.linkedin.com/in/mercedesmadanire/"
                      target="blank"
                    >
                      Mercedes Madanire
                    </a>
                  </div>
                </Col>
                <Col md>
                  <img src="/headshots/Josh.jpg" width="130" height="130" />
                  <div className="names">Joshua Skootsky</div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div className="about-text">
            <h5>ABOUT INSTASTACK</h5>
            <h3>
              Instastack is a rapid prototyping tool to build a project in less
              than 5 mins. with a custom look & feel.
            </h3>
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
            <p>
              You can learn more about the InstaStack application on{' '}
              <a
                className="text-link"
                href="https://github.com/FSA-GRP1-2001/instastack"
                target="blank"
              >
                Github
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
}
