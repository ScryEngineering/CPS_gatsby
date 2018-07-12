import React from 'react'
import Link from 'gatsby-link'

import styles from "./NavigationLinks.module.css"

const ListLink = props =>
  <li className={styles.li}>
    <Link to={props.to} className={styles.link}>
      {props.children}
    </Link>
  </li>

const NavigationLinks = () => (
  <div className={styles.div}>
    <ul className={styles.ul}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/contact/">Contact</ListLink>
      <ListLink to="/blog/">Blog</ListLink>
      <ListLink to="/tutorials/">Tutorials</ListLink>
    </ul>
  </div>
)

export default NavigationLinks