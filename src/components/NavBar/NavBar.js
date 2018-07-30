import React from 'react'
import Link from 'gatsby-link'

import styles from "./NavBar.module.scss";

const NavLink = props =>
  <div className={styles.navLink}>
    <Link to={props.to} className={styles.link}>
      {props.children}
    </Link>
  </div>

const Header = () => (
  <div className={styles.wrapper}>
    <div className={styles.navBar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          <img src="/CPS-logo-main.svg" alt="Logo"></img>
          <span>Custom Programming Solutions</span>
        </Link>
      </div>
      <div className={styles.navLinkContainer}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about/">About</NavLink>
        <NavLink to="/contact/">Contact</NavLink>
        <NavLink to="/blog/">Blog</NavLink>
        <NavLink to="/tutorials/">Tutorials</NavLink>
      </div>
    </div>
  </div>
)

export default Header
