import React from 'react'
import Link from 'gatsby-link'

const ListLink = props =>
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>

const NavigationLinks = () => (
  <div
    style={{
      background: 'green',
      marginBottom: '1.45rem',
    }}
  >
  <ul style={{ listStyle: `none`, float: `right` }}>
    <ListLink to="/">Home</ListLink>
    <ListLink to="/about/">About</ListLink>
    <ListLink to="/contact/">Contact</ListLink>
    <ListLink to="/tutorials/">Tutorials</ListLink>
  </ul>
  </div>
)

export default NavigationLinks