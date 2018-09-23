import React from 'react'
import Link from 'gatsby-link'

import Logo from "../Logo/Logo";

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
      <Logo height={70} />
      <input className={styles.menubtn} type="checkbox" id="menubtn" />
      <label className={styles.menuicon} htmlFor="menubtn"><span className={styles.navicon}></span></label>
      <div className={styles.navLinkContainer}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about/">About</NavLink>
        <NavLink to="/contact/">Contact</NavLink>
        <NavLink to="/services/">Services</NavLink>
        <NavLink to="/blog/">Blog</NavLink>
        <NavLink to="/tutorials/">Tutorials</NavLink>
        <NavLink to="/team/">Team</NavLink>
      </div>
    </div>
  </div>
)

export default Header
