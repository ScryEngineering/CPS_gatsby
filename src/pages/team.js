import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import styles from './team.module.css'

const TeamMemberSection = props =>
  <section className={styles.teamMemberSection}>
    <div className={styles.teamMemberPhotoContainer}>
      <img src="http://via.placeholder.com/400x400" className={styles.teamMemberPhoto} />
    </div>
    <div className={styles.teamMemberDetailsContainer}>
      <h2 className={styles.teamMemberName}>{props.person.name}</h2>
      <p className={styles.teamMemberTitle}>{props.person.bio}, <span className={styles.teamMemberLocation}>{props.person.location}</span></p>
      <p>{props.person.bio}... <Link to={props.person.fields.internalURL}>Read more.</Link></p>
    </div>
  </section>

export default class TeamPage extends React.Component {
  render(){
    console.log(this.props)
    const allTeamMembers = this.props.data.teamMembers.edges;
    console.log("allTeamMembers: ", allTeamMembers);
    return (
      <div>
        <Helmet>
          <title>Our Team</title>
        </Helmet>
        <h1>Our Team</h1>
        <p>Something short about how awesome we are</p>
        <div className={styles.teamMembersContainer}>
        {allTeamMembers.map(person => (
          <TeamMemberSection person={person.node} />
        ))}
        </div>
        {/*<ContactSnippet blurb="Interested in how our expert team could transform your business? Fill out the form below and one of them will get in touch with you soon." />*/}
      </div>
    );
  }
}

export const query = graphql`
query TeamQuery {
  teamMembers: allMarkdownRemark (
    filter: {
      fields: { isPerson: { eq: true } }
    }
  ) {
    edges {
      node {
        frontmatter {
          name
          image
          url
          bio
          location
          socialUrls
        }
        fields {
          internalURL
        }
      }
    }
  }
}`