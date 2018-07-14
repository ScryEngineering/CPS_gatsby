import React from 'react'
import Helmet from 'react-helmet'

export default class TeamPage extends React.Component {
  render(){
    const allTeamMembers = this.props.data.teamMembers.edges;
    return (
      <div>
        <Helmet>
          <title>The CPS team</title>
        </Helmet>
        <h1>
        Coming soon
        </h1>
        <ul>
        {allTeamMembers.map(person => (
            <li>{person.node.name}</li>
        ))}
        </ul>
      </div>
    );
  }
}

export const query = graphql`
query TeamQuery {
  # authors
  teamMembers: allPeopleJson {
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