import React from 'react'
import Link from 'gatsby-link'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Masthead from '../components/Masthead/Masthead'
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";


const IndexPage = props => (
  <div>
   <HelmetWrapper title="About" />
    <Masthead heading="About Custom Programming Solutions" />
    <div className="contentdiv">
      <p>
      Pennies matter. Seconds matter. Data matters. Your time matters, so we want to help you spend it as efficiently as possible.  
      </p>
      <p>
      At Custom Programming Solutions, we stress that not all business problems can be solved by implementing new software. 
      In fact, if you introduce new software without solving your underlying operational issues, your problems will not only linger, they'll multiply.
      That's why we combine years of specialized expertise in workflow and process automation, mathematical optimization and software development to help you make better decisions.
      </p>
      <p>
      We create bespoke software solutions for clients in the software, process automation and optimization industries.
      From engineering specialty software and improving performance to creating scalable systems that deliver long-term value,
      we build products that help our clients thrive in highly competitive markets.
      </p>
      <p>
      Through workflow and process automation, we help you unlock value by automating your most tedious tasks so you can focus on your most important work. 
      And through mathematical optimization, we explore your current processes from the ground up and target areas for improvement, then execute a well-planned strategy suited to your needs.
      Our elite consultants and software developers bring years of experience in specialty fields such as:
      <ul>
      <li>- Mathematical optimization</li>
      <li>- Data science</li>
      <li>- Natural language processing</li>
      <li>- Machine learning</li>  
      <li>- Process automation and optimization</li>
      <li>- Complex integrations between back-end systems and web technologies, including content management systems and web applications</li>
      </ul>
      </p>
      <p>
      Our passion for problem solving and innovation is in every project we engage in, and we are committed to building a long-term relationship that brings value to your business.
      Whether you’re looking for outside consulting help or augmentation for your existing internal team, we have the versatility and expertise to meet your specific requirements.
      </p>
      <p>
      When you work with us, you’ll never be left wondering - our collaborative development process, passion for educating our clients and commitment to transparency means we guide you seamlessly through every step of your project, from first contact to launch.
      </p>
      <ContactSnippet source={props.location.pathname} />
    </div>
  </div>
)

export default IndexPage