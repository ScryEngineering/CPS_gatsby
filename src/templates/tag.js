import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Link from "gatsby-link";

import PostListing from "../components/PostListing/PostListing";

export default class TagTemplate extends React.Component {
  render(){
    const tag = this.props.pathContext.tag;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const numberOfPosts = this.props.data.allMarkdownRemark.totalCount;
    const allAuthors = this.props.data.authors.edges;
    const filteredPosts = postEdges.filter(postEdges => postEdges.node.frontmatter.draft !== true);
    var postCount = filteredPosts.filter(() => true).length;
    return (
      <div>
        <HelmetWrapper title={tag + " posts"} />
        <h1>
          Posts tagged as {tag}
        </h1>
        <h4>{postCount} Posts</h4>
        <PostListing postEdges={filteredPosts} allAuthorsInfo={allAuthors}/>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    # authors
    authors: allPeopleJson {
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
            author
            draft
          }
        }
      }
    }
  }
`;