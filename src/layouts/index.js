import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import NavigationLinks from '../components/NavigationLinks';
import Footer from '../components/Footer/Footer';

import './index.css'

require("prismjs/themes/prism-solarizedlight.css");

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title="Custom Programming Solutions"
      meta={[
        { name: 'description', content: 'Custom Programming Solutions' },
        { name: 'keywords', content: 'CPS' },
      ]}
    />
    <Header />
    <NavigationLinks />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
    <Footer
      copyright={{
        label: "Custom Programming Solutions",
        url: "https://www.customprogrammingsolutions.com"
      }}
      promoteGatsby={true}
    />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
