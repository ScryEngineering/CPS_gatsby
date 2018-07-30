import React from 'react'

import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import NavBar from '../components/NavBar/NavBar'
import Masthead from '../components/Masthead/Masthead'
import Footer from '../components/Footer/Footer';

import config from '../../data/SiteConfig';

import './reset.css'
import './index.scss'

require("prismjs/themes/prism-solarizedlight.css");

export default class TemplateWrapper extends React.Component {
  render() {
    return(
      <div className="wrapper">
        <HelmetWrapper>
          <meta property="og:type" content="website" />
          <meta name="twitter:domain" value="www.customprogrammingsolutions.com" />
          <meta property="og:site_name" content="Custom Programming Solutions" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:url" content={config.siteUrl + this.props.location.pathname} />
          <meta name="twitter:url" value={config.siteUrl + this.props.location.pathname} />
          <link rel="stylesheet" href="https://use.typekit.net/bae2fex.css" />
        </HelmetWrapper>
        <NavBar />
        <Masthead />
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