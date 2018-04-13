import React from "react";

export default class TagTemplate extends React.Component {
  render(){
    const tag = this.props.pathContext.tag;
    console.log(tag);
    return (
      <h1>
        Posts tagged as {tag}
      </h1>
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