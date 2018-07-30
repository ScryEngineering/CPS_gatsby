import React from 'react'
import Link from 'gatsby-link'

import styles from "./Masthead.module.scss";

const Header = () => (
  <div className={styles.wrapper}>
    <div className={"masthead "+styles.masthead}>
      <span>
        <h1>High-tech software consulting in Melbourne.</h1>
        <p>We are a versatile programming, software development and consulting firm driven by trusted industry experts. Our clients are agile organizations who require high-quality, custom built solutions.</p>
      </span>
    </div>
  </div>
)

export default Header
