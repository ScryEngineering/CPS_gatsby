import React from 'react'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

const ServicesPage = props => (
  <div>
    <HelmetWrapper title="Services" />
    <h1>Our services</h1>
    <p>
      With a collective industry experience of multiple decades we are well placed to offer our consulting services in the following areas:
      <ul>
        <li>Business strategy</li>
        <li>Technology management</li>
        <li>Process optimization and automation</li>
        <li>Blockchain and distributed systems</li>
        <li>Cryptography and security</li>
        <li>Mathematical optimization</li>
        <li>Machine learning/AI systems</li>
        <li>Embedded systems and Linux kernel development</li>
      </ul>
      We are particularly keen to work on projects where we can partner to deliver value via our services.

      We also take a very strong interest in education and regularly attend and present at various workshops and conferences.
      We can help upskill your team or work as coaches to intermediate to senior talent looking to take their skills up to the next level.

      <ul>
        <li>Educational strategy consulting, including bringing our expertise in educational settings to help your organization be more efficient with training and professional development.</li>
        <li>Provide in house training programs and workshops on specialized topics</li>
      </ul>
      If you are looking for mentors/training for community events please feel free to contact us, we are strong proponents of the technical community in general and are always looking for opportunities to help people help the community.

    </p>
    <ContactSnippet source={props.location.pathname} blurb="Would you like to discuss how we could help you? Fill out the form below and we'll get in touch as soon as possible." />
  </div>
)

export default ServicesPage
