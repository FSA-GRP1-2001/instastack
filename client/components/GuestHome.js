import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Row,
  Col,
  getRowProps,
  getColumnProps,
} from 'react-flexbox-grid';
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

        <div className="userhome-nav-selection">
          <center>
            <Link to="/template">Link to all Templates</Link>
          </center>
        </div>
        <div>
          <Grid fluid>
            <Row>
              <Col xs>Blank</Col>
              <img src={temp} width="100" height="100" />

              <Col xs> Blog</Col>
              {/* <img src={temp} width="45" height="45" /> */}

              <Col xs> HomePage</Col>
              {/* <img src={temp} width="45" height="45" /> */}

              <Col xs> Form</Col>
              {/* <img src={temp} width="45" height="45" /> */}
            </Row>
          </Grid>
        </div>
        <div className="bottom-half">
          <div>
            <div className="bottom-half">
              <Grid fluid>
                <Col md>Amantina Sosa</Col>
                <img src={temp} width="100" height="100" />
                <Col md>Mercedes Madanire</Col>
                <img src={temp} width="100" height="100" />
              </Grid>
            </div>

            <div className="bottom-half">
              <Grid fluid>
                <Row>
                  <Col md>Maxwell Han</Col>

                  <img src={temp} width="100" height="100" />
                  <Col md>Joshua Skootsky</Col>
                  <img src={temp} width="100" height="100" />
                </Row>
              </Grid>
            </div>
          </div>

          {/* <div>
            <div className="bottom-half">
              <Grid fluid>
                <Row>
                  <Col md>Amantina Sosa</Col>
                  <img src={temp} width="100" height="100" />
                  <Col md>Maxwell Han</Col>
                  {''} {''} {''}
                  <img src={temp} width="100" height="100" />
                </Row>
              </Grid>
            </div>
            <div className="bottom-half">
              <Grid fluid>
                <Row>
                  <Col md>Mercedes Madanire</Col>
                  <img src={temp} width="100" height="100" />
                  <Col md>Joshua Skootsky</Col>
                  <img src={temp} width="100" height="100" />
                </Row>
              </Grid>
            </div>
          </div> */}

          <div className="text">
            <h3>
              Lorem ipsum dolor sit amet, ea vim quidam molestie, indoctum
              expetenda et mei. Novum numquam at cum. Pro choro volumus
              neglegentur eu, nec ei sonet voluptaria. Nibh liber atomorum eu
              eam. Delenit deleniti oporteat et nec, nisl denique an qui. An mei
              velit fabellas, mea eu stet graeci, duis bonorum reformidans ei
              ius. Eum doming probatus eu, vim inani gloriatur percipitur an. Te
              usu nonumy audiam democritum. Cu has nostrud alienum, prima debet
              perfecto te cum. Ei ius modus laudem iudicabit. Ne mei alii
              accumsan. Ut enim oporteat his, eam unum dolorum at.
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
