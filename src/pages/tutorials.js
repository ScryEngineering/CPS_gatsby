import React from 'react'
import Link from "gatsby-link";

import styles from "./tutorials.module.css"

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1 display={"inline-block"} borderBottom={"1px solid"}>
        Tutorial pages
      </h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
          <h3>
            {node.frontmatter.title}{" "}
            <span color="#BBB">— {node.frontmatter.date}</span>
          </h3>
          </Link>
          <Link
            to={node.fields.slug}
            className={styles.summarytext}
          >
          <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
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
