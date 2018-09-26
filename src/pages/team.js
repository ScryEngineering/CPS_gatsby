import React from 'react'
import Link from 'gatsby-link'

import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import Masthead from '../components/Masthead/Masthead'
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

import AuthorSection from "../components/AuthorSection/AuthorSection";

export default class TeamPage extends React.Component {
  render() {
    let allTeamMembers = this.props.data.teamMembers.edges;
    return (
      <div>
        <HelmetWrapper title="Our Team" />
        <Masthead heading="Our Team" />
        <div className="contentdiv">
          {allTeamMembers.map(person => (
            <AuthorSection person={person.node} images={this.props.data.allImages.edges} />
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
  allImages: allFile {
    edges {
      node {
        relativePath
        childImageSharp {
          sizes(maxWidth: 500) {
          	...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
}`