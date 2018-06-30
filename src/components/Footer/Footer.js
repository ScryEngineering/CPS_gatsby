import React, { Component } from "react";
import styles from "./Footer.module.css";
var { SocialIcon } = require('react-social-icons');

class Footer extends Component {
  render() {
    const { label, url, year } = this.props.copyright;
    return (
      <footer className={styles.siteFooter}>
        <section className={styles.logo}>
          <img src="/logo-CPS.png" alt="CPS logo"></img>
        </section>
        <section className={styles.copyright}>
          <a href={url || "/"}>{label}</a> &copy;{" "}
          {year || new Date().getFullYear()}
        </section>
        <section className={styles.socialButtons}>
          <SocialIcon url="https://github.com/customprogrammingsolutions" />
        </section>
      </footer>
    );
  }
}

export default Footer;