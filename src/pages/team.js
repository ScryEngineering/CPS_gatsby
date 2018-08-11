import React from 'react'
import Link from 'gatsby-link'

import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import Masthead from '../components/Masthead/Masthead'
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

import styles from './team.module.scss'

const TeamMemberSection = props =>
  <section className={styles.teamMemberSection}>
    <div className={styles.teamMemberPhotoContainer}>
      <img src={props.person.frontmatter.image} className={styles.teamMemberPhoto} />
    </div>
    <div className={styles.teamMemberDetailsContainer}>
      <h2 className={styles.teamMemberName}>{props.person.frontmatter.name}</h2>
      <p className={styles.teamMemberTitle}>{props.person.frontmatter.bio}, <span className={styles.teamMemberLocation}>{props.person.frontmatter.location}</span></p>
      <p>{props.person.frontmatter.shortBlurb}. <Link to={props.person.fields.internalURL}>Read more.</Link></p>
    </div>
  </section>

export default class TeamPage extends React.Component {
  render(){
    console.log(this.props)
    const allTeamMembers = this.props.data.teamMembers.edges;
    console.log("allTeamMembers: ", allTeamMembers);
    return (
      <div>
        <HelmetWrapper title="Our Team" />
        <Masthead heading="Our Team" />
        <div className="contentdiv">
          {allTeamMembers.map(person => (
            <TeamMemberSection person={person.node} />
          ))}
          <ContactSnippet blurb="Interested in how our expert team could transform your business? Fill out the form below and one of them will get in touch with you soon." />
        </div>
      </div>
    );
  }
}

export const query = graphql`
query TeamQuery {
  teamMembers: allMarkdownRemark (
    filter: {
      fields: { isPerson: { eq: true } },
      frontmatter: { teamMember: { eq: true } }
    }
  ) {
    edges {
      node {
        frontmatter {
          name
          image
          url
          location
          bio
          socialUrls
          shortBlurb
          miniBlurb
        }
        fields {
          internalURL
        }
      }
    }
  }
}`