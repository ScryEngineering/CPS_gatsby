import React, { Component } from "react";
import Link from "gatsby-link";

import Logo from "../Logo/Logo";

import styles from "./Footer.module.scss";

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
                  <li><Link className={styles.grouplink} to="/contact">Contact form</Link></li>
                  <li><a className={styles.grouplink} href="https://www.linkedin.com/company/customprogrammingsolutions/">LinkedIn</a></li>
                  {/*<li><a className={styles.grouplink} href="">Facebook</a></li>*/}
                  <li><a className={styles.grouplink} href="https://twitter.com/C_P_S_online">Twitter</a></li>
                  <li><a className={styles.grouplink} href="/rss.xml">RSS</a></li>
                  <li><a className={styles.grouplink} href="https://github.com/customprogrammingsolutions">GitHub</a></li>
                </ul>
              </div>
              <div className={styles.group}>
                <h4>Pages</h4>
                <ul>
                  <li><Link className={styles.grouplink} to="/">Research</Link></li>
                  <li><Link className={styles.grouplink} to="/">Case studies</Link></li>
                  <li><Link className={styles.grouplink} to="/blog">Blogs &amp; Tutorials</Link></li>
                  <li><Link className={styles.grouplink} to="/">Team</Link></li>
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