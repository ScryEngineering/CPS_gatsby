import React from 'react'
import Link from 'gatsby-link'

import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import Masthead from '../components/Masthead/Masthead'
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

import AuthorSection from "../components/AuthorSection/AuthorSection";

export default class TeamPage extends React.Component {
  render() {
    let images = this.props.data.faces.edges;
    let allTeamMembers = this.props.data.teamMembers.edges.map(person => {
      return {
        node: {
          ...person.node,
          image: images.find(image => image.node.relativePath === person.node.frontmatter.image)
            || images.find(image => image.node.relativePath === "notfound.jpg")
        }
      };
    });
    return (
      <div>
        <HelmetWrapper title="Our Team" />
        <Masthead heading="Our Team" />
        <div className="contentdiv">
          {allTeamMembers.map(person => (
            <AuthorSection person={person.node} />
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
  },
  faces: allFile {
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