import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Masthead from '../components/Masthead/Masthead'

import PostListing from "../components/PostListing/PostListing";

import styles from "./person.module.scss";

export default class PersonalAboutTemplate extends React.Component {
    render(){
      //Note that if 2 people have the exact same name this will fail
      const data = this.props.data.authors.edges[0].node;
      const postEdges = this.props.data.allMarkdownRemark.edges;
      const allAuthors = this.props.data.allAuthors.edges;
      const author_has_personal_URL = data.frontmatter.url !== null && data.frontmatter.url !== undefined;
      return (
        <div>
          <HelmetWrapper title={data.frontmatter.name} description={data.frontmatter.miniBlurb} />
          <Masthead heading={"About " + data.frontmatter.name} paragraph={data.frontmatter.bio + ", " + data.frontmatter.location} />
          <div className="contentdiv">
            <div className="post-content" dangerouslySetInnerHTML={{ __html: data.html }} />
            { author_has_personal_URL &&
            <div className="main-url">{data.frontmatter.name} has a personal website here: <a href={data.frontmatter.url}>{data.frontmatter.url}</a> </div>
            }
            <h2 className={styles.postsby}>Posts by {data.frontmatter.name}</h2>
            <PostListing postEdges={postEdges} allAuthorsInfo={allAuthors} filter={post => post.node.frontmatter.authors && post.node.frontmatter.authors.indexOf(data.frontmatter.name) >= 0}/>
          </div>
        </div>
      );
    }
};

 /* eslint no-undef: "off" */
export const pageQuery = graphql`
query AuthorPage($author: String) {
  authors: allMarkdownRemark (
    filter: {
      fields: { isPerson: { eq: true } }
      frontmatter: { name: { eq: $author } }
    }
  ) {
    edges {
      node {
        html
        frontmatter {
          name
          image
          url
          bio
          location
          socialUrls
          miniBlurb
        }
        fields {
          internalURL
        }
      }
    }
  }
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
  allAuthors: allMarkdownRemark (filter: { fields: { isPerson: { eq: true } } }) {
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
}
`;
