import React from 'react'
import Link from 'gatsby-link'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

const IndexPage = props => (
  <div>
    <HelmetWrapper title="Home" />
    <h1>Welcome to Custom Programming Solutions</h1>
    <p>
    We are a versatile programming, software development and consulting firm driven by trusted industry experts.
    Our clients are agile organizations who require high-quality, custom built solutions.
    </p>
    <ContactSnippet source={props.location.pathname} blurb="Interested in what we could offer for your business? Fill out the form below and we'll get in touch as soon as possible." />
  </div>
)

export default IndexPage
