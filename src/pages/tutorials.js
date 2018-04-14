import React from 'react'
import Link from "gatsby-link";

import styles from "./tutorials.module.css"
import PostListing from "../components/PostListing/PostListing";

export default class TutorialTemplate extends React.Component {
  render(){
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const numberOfPosts = this.props.data.allMarkdownRemark.totalCount;
    return (
      <div>
        <h1>
          Tutorials
        </h1>
        <h4>{numberOfPosts} Posts</h4>
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

export const query = graphql`
query IndexQuery {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
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
        }
      }
    }
  }
}
`;
