import React from 'react'
import Link from "gatsby-link";

import styles from "./tutorials.module.css"
import PostListing from "../components/PostListing/PostListing";


export default ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <div>
      <h1 display={"inline-block"} borderBottom={"1px solid"}>
        Tutorial pages
      </h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      <PostListing postEdges={postEdges} />
    </div>
  );
};

export const query = graphql`
query IndexQuery {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
}
`;
