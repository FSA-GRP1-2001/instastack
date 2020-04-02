import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';

import {
  Grid,
  Row,
  Col,
  getRowProps,
  getColumnProps,
} from 'react-flexbox-grid';

const userButton = {
  color: '#333055',
  background: 'transparent',
  border: 'transparent',
  fontWeight: 'bolder',
};
export default class GuestHome extends Component {
  render() {
    //let display = '(!instaChallenge) => {build your HTML view in < 5 mins);';
    //<h1>{display}</h1>
    return (
      <div className="mainpage">
        <div className="center-image">
          <img src="/img/text-621x103.png" width="621" height="103" />
        </div>
        <div className="get-started">
          <center>
            <h2>Get started Now! </h2>
            <Link to="/mainPage">
              <Button
                label="New Project"
                icon="pi pi-plus"
                className="p-button-raised white-buttons"
              />
            </Link>
          </center>
        </div>
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
                      src="img/templates/t1.png"
                      width="130"
                      height="130"
                    />
                  </Link>
                </Col>
                <Col md>
                  <Link to="/blogtemplate">
                    <img
                      className="img-fade"
                      src="img/templates/t2.png"
                      width="130"
                      height="130"
                    />
                  </Link>
                </Col>
                <Col md>
                  <Link to="/landingpagetemplate">
                    <img
                      className="img-fade"
                      src="img/templates/t3.png"
                      width="130"
                      height="130"
                    />
                  </Link>
                </Col>
                <Col md>
                  <Link to="#">
                    <img
                      className="img-fade"
                      src="img/templates/t4.png"
                      width="130"
                      height="130"
                    />
                  </Link>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        {/* <div className="templates-grid">
          <Card className="template-card">
            <a href="#" target="blank">
                  <img src="/templates/t1.png" width="130" height="130" />
            </a>
          </Card>
          <Card className="template-card">
            <a href="#" target="blank">
                  <img src="/templates/t2.png" width="130" height="130" />
            </a>
          </Card>
          <Card className="template-card">
            <a href="#" target="blank">
                  <img src="/templates/t3.png" width="130" height="130" />
            </a>
          </Card>
          <Card className="template-card">
            <a href="#" target="blank">
                  <img src="/templates/t4.png" width="130" height="130" />
            </a>
          </Card>
        </div> */}

        <div className="about">
          <div className="profile-grid">
            <Grid fluid>
              <Row around="xs">
                <Col md>
                  <a
                    href="https://www.linkedin.com/in/amantina-sosa/"
                    target="blank"
                  >
                    <img
                      src="img/headshots/Tina.jpg"
                      width="130"
                      height="130"
                    />
                  </a>
                  <div className="names-top">
                    <a
                      className="text-link"
                      href="https://www.linkedin.com/in/amantina-sosa/"
                      target="blank"
                    >
                      Amantina Sosa
                    </a>
                  </div>
                </Col>
                <Col md>
                  <a
                    href="https://www.linkedin.com/in/maxwellhan"
                    target="blank"
                  >
                    <img src="img/headshots/Max.jpg" width="130" height="130" />
                  </a>
                  <div className="names-top">
                    <a
                      className="text-link"
                      href="https://www.linkedin.com/in/maxwellhan"
                      target="blank"
                    >
                      Maxwell Han
                    </a>
                  </div>
                </Col>
              </Row>
              <Row around="xs">
                <Col md>
                  <a
                    href="https://www.linkedin.com/in/mercedesmadanire/"
                    target="blank"
                  >
                    <img
                      src="img/headshots/Mercedes.jpg"
                      width="130"
                      height="130"
                    />
                  </a>
                  <div className="names">
                    <a
                      className="text-link"
                      href="https://www.linkedin.com/in/mercedesmadanire/"
                      target="blank"
                    >
                      Mercedes Madanire
                    </a>
                  </div>
                </Col>
                <Col md>
                  <a
                    href="https://www.linkedin.com/in/joshua-skootsky/"
                    target="blank"
                  >
                    <img
                      className="text-link"
                      src="img/headshots/Josh.jpg"
                      width="130"
                      height="130"
                    />
                  </a>
                  <div className="names">
                    <a
                      className="text-link"
                      href="https://www.linkedin.com/in/joshua-skootsky/"
                      target="blank"
                    >
                      Joshua Skootsky
                    </a>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div className="about-text">
            <h5>ABOUT INSTASTACK</h5>
            <h3>
              Instastack is a rapid prototyping tool to build a project in less
              than 5 minutes with a custom look & feel.
            </h3>
            <p>
              InstaStack was created for the Capstone project at Fullstack
              Academy by Tina Sosa, Max Han, Mercedes Madanire, and Joshua
              Skootsky.
            </p>
            <p>
              The InstaStack application is built with Postgress, Sequelize,
              Express, React, and Redux. The front-end style is built with HTML,
              CSS, and PrimeReact.
            </p>
            <p>
              You can learn more about the InstaStack team, and application on{' '}
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
