import React, { Component } from "react";

import Logo from "../Logo/Logo";

import styles from "./Footer.module.scss";
var { SocialIcon } = require('react-social-icons');

class Footer extends Component {
  render() {
    const { label, url, year } = this.props.copyright;
    return (
      <footer className={styles.wrapper}>
        <div className={styles.footer}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.group}>
                <h4>Get in touch</h4>
                <ul>
                  <li>Contact form</li>
                  <li>LinkedIn</li>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>RSS</li>
                  <li>GitHub</li>
                  <li>Email</li>
                </ul>
              </div>
              <div className={styles.group}>
                <h4>Pages</h4>
                <ul>
                  <li>Research</li>
                  <li>Case studies</li>
                  <li>Blogs &amp; Tutorials</li>
                  <li>Team</li>
                </ul>
              </div>
            </div>
            <div className={styles.copyright}>
              &copy;{" "}{year || new Date().getFullYear()}{" "}
              <a href={url || "/"} className={styles.cpsLink}>{label}</a><br />
              ABN: 34627525197<br />
              ACN: 627 525 197
            </div>
          </div>
          <div className={styles.bottom}>
            <Logo height={40} dark={true} />
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;