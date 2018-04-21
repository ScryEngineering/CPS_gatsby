import React from 'react'
import Helmet from 'react-helmet'
import Link from "gatsby-link";

import styles from "./tutorials.module.css"
import PostListing from "../components/PostListing/PostListing";

export default class TutorialListingTemplate extends React.Component {
  render(){
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const numberOfPosts = this.props.data.allMarkdownRemark.totalCount;
    const allAuthors = this.props.data.authors.edges;
    return (
      <div>
        <Helmet>
          <title>Tutorials</title>
        </Helmet>
        <h1>
          Tutorials
        </h1>
        <h4>{numberOfPosts} Posts</h4>
        <PostListing postEdges={postEdges} allAuthorsInfo={allAuthors}/>
      </div>
    );
  }
}

export const query = graphql`
query TutorialIndexQuery {
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
  # tutorial posts
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { draft: { ne: true } } }
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
        }
      }
    }
  }
}
`;
