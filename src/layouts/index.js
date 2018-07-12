import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import NavigationLinks from '../components/NavigationLinks';
import Footer from '../components/Footer/Footer';

import './reset.css'
import './index.css'

require("prismjs/themes/prism-solarizedlight.css");

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title="Custom Programming Solutions"
      titleTemplate="Custom Programming Solutions - %s"
      meta={[
        { name: 'description', content: 'Custom Programming Solutions' },
        { name: 'keywords', content: 'CPS' },
      ]}
    />
    <Header />
    <NavigationLinks />
    <div className="contentdiv">
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
