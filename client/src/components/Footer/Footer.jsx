import React from "react"
import { SlackOutlined } from "@ant-design/icons"

const Footer = () => {
  return (
    <footer className="footer p-5 bg-main">
      <div className="row">
        <div className="col-12 col-md">
          <h5 className="text-white"> Created by Faris Chtatou </h5>
          <SlackOutlined style={{ fontSize: "64px" }} />
          <small className="d-block mb-3 text-muted">&copy; 2020-2020</small>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">Features</h5>
          <ul className="list-unstyled text-small text-muted">
            <li>Cool stuff</li>
            <li>Random feature</li>
            <li>Team feature</li>
            <li>Stuff for developers</li>
            <li>Another one</li>
            <li>Last time</li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">Resources</h5>
          <ul className="list-unstyled text-small text-muted">
            <li>Resource</li>
            <li>Resource name</li>
            <li>Another resource</li>
            <li>Final resource</li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">Resources</h5>
          <ul className="list-unstyled text-small text-muted">
            <li>Business</li>
            <li>Education</li>
            <li>Government</li>
            <li>Gaming</li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-white">About</h5>
          <ul className="list-unstyled text-small text-muted">
            <li>Team</li>
            <li>Locations</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
