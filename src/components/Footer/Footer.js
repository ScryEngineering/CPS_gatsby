import React, { Component } from "react";
import styles from "./Footer.module.css";
var { SocialIcon } = require('react-social-icons');

class Footer extends Component {
  render() {
    const { label, url, year } = this.props.copyright;
    return (
      <footer className={styles.wrapper}>
        <div className="footer">
          <section className={styles.logoContainer}>
            <img src="/logo-CPS.png" alt="CPS logo"></img>
          </section>
          <section className={styles.copyright}>
            Copyright{" "}{year || new Date().getFullYear()}<br />
            <a href={url || "/"} className={styles.cpsLink}>{label}</a><br />
            ACN: 627 525 197<br />
            ABN: 34627525197
          </section>
          <section className={styles.socialButtons}>
            <SocialIcon url="https://github.com/customprogrammingsolutions" />
            <SocialIcon url="https://twitter.com/C_P_S_online" />
            <SocialIcon url="https://www.linkedin.com/company/18716004/" />
            <SocialIcon url="/rss.xml" network="rss" />
          </section>
        </div>
      </footer>
    );
  }
}

export default Footer;