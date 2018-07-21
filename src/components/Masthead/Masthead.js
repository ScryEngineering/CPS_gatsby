import React from 'react'
import Link from 'gatsby-link'

import styles from "./Masthead.module.css";

const Header = () => (
  <div className={styles.wrapper}>
    <div className={"masthead "+styles.masthead}>
      <span>
        <h1>Welcome.</h1>
        <p>Lorem ipsum dolor sit amet</p>
      </span>
    </div>
  </div>
)

export default Header
