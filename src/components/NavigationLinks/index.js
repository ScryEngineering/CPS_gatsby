import React from 'react'
import Link from 'gatsby-link'

import styles from "./NavigationLinks.module.css"

const ListLink = props =>
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>

const NavigationLinks = () => (
  <div className={styles.navigationLinks}>
    <ul style={{ listStyle: `none`, float: `center` }}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/contact/">Contact</ListLink>
      <ListLink to="/tutorials/">Tutorials</ListLink>
    </ul>
  </div>
)

export default NavigationLinks