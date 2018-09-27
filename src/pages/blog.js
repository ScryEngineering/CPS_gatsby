import React from 'react'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Masthead from '../components/Masthead/Masthead'

import PostListing from "../components/PostListing/PostListing";

export default class BlogListingTemplate extends React.Component {
  render(){
    return (
      <div>
        <HelmetWrapper title="Blog" />
        <Masthead heading="Blog posts" />
        <div className="contentdiv">
          <PostListing postEdges={this.props.data.allMarkdownRemark.edges} allAuthorsInfo={this.props.data.authors.edges} filter={post => post.node.frontmatter.contentType === "blog"} />
        </div>
      </div>
    );
  }
}

export const query = graphql`
query IndexQuery {
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
  # blog posts
  allMarkdownRemark (
    sort: { fields: [frontmatter___date], order: DESC }
    filter: {
      frontmatter: { draft: { ne: true } }
      fields: { isPost: { eq: true } }
    }
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        excerpt
        frontmatter {
          title
          tags
          date(formatString: "MMMM Do, YYYY")
          authors
          draft
          contentType
        }
      }
    }
  }
}
`;