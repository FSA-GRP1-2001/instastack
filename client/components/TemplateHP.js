import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TemplateHP extends Component {
  render() {
    return (
      <div>
        <center>
          <h2> I want to build a </h2>
          <section className="userhome-container">
            <center>
              <ul>
                <div className="userhome-nav-selection">
                  <Link to="">Homepage</Link>
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
                <div className="userhome-nav-selection">
                  <Link to="">Landing Page</Link>
                </div>
                <div className="userhome-nav-selection">
                  <Link to="">Blog</Link>
                </div>
              </ul>
            </center>
          </section>
        </center>
      </div>
    );
  }
}
