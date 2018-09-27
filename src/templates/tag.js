import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Link from "gatsby-link";

import Masthead from '../components/Masthead/Masthead'
import PostListing from "../components/PostListing/PostListing";

export default class TagTemplate extends React.Component {
  render(){
    const tag = this.props.pathContext.tag;
    return (
      <div>
        <HelmetWrapper title={tag + " posts"} />
        <Masthead heading={"Posts tagged with \"" + tag + "\""} />
        <div className="contentdiv">
          <PostListing postEdges={this.props.data.allMarkdownRemark.edges} allAuthorsInfo={this.props.data.authors.edges} />
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    # authors
    authors: allMarkdownRemark (filter: { fields: { isPerson: { eq: true } } }) {
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
    allMarkdownRemark (
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: {isPost: { eq: true } }
        frontmatter: { draft: { ne: true } }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date(formatString: "MMMM Do, YYYY")
            authors
            draft
          }
        }
      }
    }
  }
`;