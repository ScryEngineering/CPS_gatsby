import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'


export default class TeamPage extends React.Component {
  render(){
    const allTeamMembers = this.props.data.teamMembers.edges;
    console.log("allTeamMembers: ", allTeamMembers);
    return (
      <div>
        <Helmet>
          <title>The CPS team</title>
        </Helmet>
        <h1>
          The CPS team
        </h1>
        <ul>
        {allTeamMembers.map(person => (
            <li><Link to={person.node.fields.internalURL}>{person.node.name}</Link></li>
        ))}
        </ul>
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