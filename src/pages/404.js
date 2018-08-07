import React from 'react'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Masthead from '../components/Masthead/Masthead'


const NotFoundPage = () => (
  <div>
    <HelmetWrapper title="Not found" />
    <Masthead heading="Not found" />
    <div className="contentdiv">
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </div>
)

export default NotFoundPage
