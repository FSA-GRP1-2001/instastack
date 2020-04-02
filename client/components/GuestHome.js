import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import Templates from './Templates';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
        {/* BTW Templates are here :)  */}
        <Templates />

        <div className="about">
          <div className="profile-grid">
            <Grid fluid>
              <Row around="xs">
                <Col md>
                  <a
                    href="https://www.linkedin.com/in/amantina-sosa/"
                    target="blank"
                  >
                    <img src="/headshots/Tina.jpg" width="130" height="130" />
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
                    <img src="/headshots/Max.jpg" width="130" height="130" />
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
                      src="/headshots/Mercedes.jpg"
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
                      src="/headshots/Josh.jpg"
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
