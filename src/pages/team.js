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
      <h2>{props.name}</h2>
      <p>{props.name}</p>
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
        <ul>
        {allTeamMembers.map(person => (
          <TeamMemberSection name={person.node.name} />
        ))}
        </ul>
        {/*<ContactSnippet blurb="Interested in how our expert team could transform your business? Fill out the form below and one of them will get in touch with you soon." />*/}
      </div>
    );
  }
}

export const query = graphql`
query TeamQuery {
  # authors
  teamMembers: allPeopleJson (
    filter: { teamMember: { eq: true } }
  ){
    edges {
      node {
        id
        name
        image
        url
        bio
        location
        socialUrls
        fields {
          internalURL
        }
      }
    }
  }
}`