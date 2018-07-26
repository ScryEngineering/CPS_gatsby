import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header/Header'
import NavigationLinks from '../components/NavigationLinks';
import Footer from '../components/Footer/Footer';

import './reset.css'
import './index.css'

require("prismjs/themes/prism-solarizedlight.css");

export default class TemplateWrapper extends React.Component {
  render() {
    return (
      <div className="wrapper">
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
          {this.props.children()}
        </div>
        <Footer
          copyright={{
            label: "Custom Programming Solutions Pty Ltd",
            url: "https://www.customprogrammingsolutions.com"
          }}
        />
      </div>
    )
  }
}