import React from 'react'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Link from "gatsby-link";

import Masthead from '../components/Masthead/Masthead'

import styles from "./tutorials.module.scss"
import PostListing from "../components/PostListing/PostListing";

export default class TutorialListingTemplate extends React.Component {
  render(){
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const numberOfPosts = this.props.data.allMarkdownRemark.totalCount;
    const allAuthors = this.props.data.authors.edges;
    const filteredPosts = postEdges.filter(postEdges => postEdges.node.frontmatter.contentType === "tutorial");
    var postCount = filteredPosts.filter(() => true).length;
    return (
      <div>
        <HelmetWrapper title="Tutorials" />
        <Masthead heading="Tutorials" />
        <div className="contentdiv">
          <h4>{postCount} Posts</h4>
          <PostListing postEdges={filteredPosts} allAuthorsInfo={allAuthors}/>
        </div>
      </div>
    );
  }
}

export const query = graphql`
query TutorialIndexQuery {
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
  # tutorial posts
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
          date(formatString: "DD MMMM, YYYY")
          author
          draft
          contentType
        }
      }
    }
  }
}
`;
