import React from "react";
import { SlackOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="footer p-5 bg-dark">
      <div className="row">
        <div className="col-12 col-md">
          <h5 className="text-white"> Created by Faris Chtatou </h5>
          <SlackOutlined style={{ fontSize: "64px" }} />
          <small className="d-block mb-3 text-muted">&copy; 2020-2020</small>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">Features</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted">Cool stuff</a>
            </li>
            <li>
              <a className="text-muted">Random feature</a>
            </li>
            <li>
              <a className="text-muted">Team feature</a>
            </li>
            <li>
              <a className="text-muted">Stuff for developers</a>
            </li>
            <li>
              <a className="text-muted">Another one</a>
            </li>
            <li>
              <a className="text-muted">Last time</a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">Resources</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted">Resource</a>
            </li>
            <li>
              <a className="text-muted">Resource name</a>
            </li>
            <li>
              <a className="text-muted">Another resource</a>
            </li>
            <li>
              <a className="text-muted">Final resource</a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">Resources</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted">Business</a>
            </li>
            <li>
              <a className="text-muted">Education</a>
            </li>
            <li>
              <a className="text-muted">Government</a>
            </li>
            <li>
              <a className="text-muted">Gaming</a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">About</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted">Team</a>
            </li>
            <li>
              <a className="text-muted">Locations</a>
            </li>
            <li>
              <a className="text-muted">Privacy</a>
            </li>
            <li>
              <a className="text-muted">Terms</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
