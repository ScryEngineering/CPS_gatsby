import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div
    style={{
      background: 'black',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0.45rem 1.0875rem',
      }}
    >
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
