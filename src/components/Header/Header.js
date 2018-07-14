import React from 'react'
import Link from 'gatsby-link'

import styles from "./Header.module.css";

const Header = () => (
  <div className={styles.wrapper}>
    <div className="header">
      <span style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <img src="/CPS-BW-header.png" alt="Custom Programming Solutions"></img>
        </Link>
      </span>
    </div>
  </div>
)

export default Header
