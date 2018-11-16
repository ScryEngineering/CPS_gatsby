import React from 'react'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import Masthead from '../components/Masthead/Masthead';
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

const ServicesPage = props => (
  <div>
    <HelmetWrapper title="Services" />
    <Masthead heading="Our services" />
    <div className="contentdiv">
      <p>With a collective industry experience of multiple decades we are well placed to offer our consulting services in the following areas:</p>
      <ul>
        <li>Blockchain and distributed systems</li>
        <li>Business strategy and technology management</li>
        <li>Cloud services and DevOps</li>
        <li>Machine learning and artificial intelligence</li>
        <li>Process automation and optimization</li>
        <li>Cryptography and security</li>
        <li>Mathematical optimization</li>
      </ul>
      <p>We are particularly keen to work on projects where we can partner to deliver value via our services.</p>
      <ContactSnippet source={props.location.pathname} blurb="Would you like to discuss how we could help you? Fill out the form below and we'll get in touch as soon as possible." />
    </div>
  </div>
)

export default ServicesPage
