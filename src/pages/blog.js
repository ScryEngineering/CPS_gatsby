import React from 'react'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Masthead from '../components/Masthead/Masthead'
import Link from "gatsby-link";

import styles from "./tutorials.module.scss"
import PostListing from "../components/PostListing/PostListing";

export default class BlogListingTemplate extends React.Component {
  render(){
    console.log(this.props.data)
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const numberOfPosts = this.props.data.allMarkdownRemark.totalCount;
    const allAuthors = this.props.data.authors.edges;
    console.log(allAuthors)
    const filteredPosts = postEdges.filter(postEdges => postEdges.node.frontmatter.contentType === "blog");
    var postCount = filteredPosts.filter(() => true).length;

    return (
      <div>
        <HelmetWrapper title="Blog" />
        <Masthead heading="Blog posts" />
        <div className="contentdiv">
          <h4>{postCount} Posts</h4>
          <PostListing postEdges={filteredPosts} allAuthorsInfo={allAuthors} />
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