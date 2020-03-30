import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TemplateHome extends Component {
  render() {
    return (
      <div>
        <center>
          <h2> I want to build a </h2>
          <section className="userhome-container">
            <center>
              <ul>
                <div className="userhome-nav-selection">
                  <Link to="blogtemplate">Blog</Link>
                </div>
                <div className="userhome-nav-selection">
                  <Link to="landingpagetemplate">Landing Page</Link>
                </div>
                <div className="userhome-nav-selection">
                  <Link to="">Home Page</Link>
                </div>
                <div className="userhome-nav-selection">
                  <Link to="">Form</Link>
                </div>
                <div className="userhome-nav-selection">
                  <Link to="">Map</Link>
                </div>
                <div className="userhome-nav-selection">
                  <Link to="">About Page</Link>
                </div>
              </ul>
            </center>
          </section>
        </center>
      </div>
    );
  }
}
