import React from "react";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const {tag} = data;
  console.log(data);
  return (
    <div>
      Posts tagged as {tag}
    </div>
  );
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