import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

const IndexPage = () => (
  <div>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1>Welcome to Custom Programming Solutions</h1>
    <p>
    We are a versatile programming, software development and consulting firm driven by trusted industry experts.
    Our clients are agile organizations who require high-quality, custom built solutions.
    </p>
    <ContactSnippet blurb="Interested in what we could offer for your business? Fill out the form below and we'll get in touch as soon as possible." />
  </div>
)

export default IndexPage
