import React from "react";
import Link from "gatsby-link";
import PostListing from "../components/PostListing/PostListing";


export default class TagTemplate extends React.Component {
  render(){
    const tag = this.props.pathContext.tag;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const numberOfPosts = this.props.data.allMarkdownRemark.totalCount;
    return (
      <div>
        <h1>
          Posts tagged as {tag}
        </h1>
        <h4>{numberOfPosts} Posts</h4>
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            date
          }
        }
      }
    }
  }
`;