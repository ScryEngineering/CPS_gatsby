import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import NavBar from '../components/NavBar/NavBar'
import Masthead from '../components/Masthead/Masthead'
import Footer from '../components/Footer/Footer';

import './reset.css'
import './index.css'

require("prismjs/themes/prism-solarizedlight.css");

const TemplateWrapper = ({ children, data }) => (
  <div className="wrapper">
    <Helmet
      title="Custom Programming Solutions"
      titleTemplate="Custom Programming Solutions - %s"
      meta={[
        { name: 'description', content: 'Custom Programming Solutions' },
        { name: 'keywords', content: 'CPS' },
      ]}
    />
    <NavBar />
    <Masthead />
    <div className="contentdiv">
      {children()}
    </div>
    <Footer
      copyright={{
        label: "Custom Programming Solutions Pty Ltd",
        url: "https://www.customprogrammingsolutions.com"
      }}
    />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
