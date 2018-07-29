import React from 'react'
import Link from 'gatsby-link'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

const ContactPage = props => (
  <div>
    <HelmetWrapper title="Contact" />
    <h1>Contact us</h1>
    <p>
      Do you have a question about projects, technologies, tutorial posts you'd like to see or something else that is of interest?
      Looking to find technical talent in the Melbourne, Australia or Toronto, Canada areas?
      If you would like to start a discussion about how we can help you we'd love to hear from you, send us an email: hello at customprogrammingsolutions.com
    </p>
    <ContactSnippet source={props.location.pathname} blurb="Prefer to have us contact you? Fill out the form below and we'll get in touch as soon as possible." />
  </div>
)

export default ContactPage
