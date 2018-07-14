import React from "react";
import Helmet from 'react-helmet'

import PostTags from "../components/PostTags/PostTags";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  const post = data.markdownRemark; // data.markdownRemark holds our post data
  const postHasTags = post.frontmatter.tags !== null && post.frontmatter.tags.length > 0
  return (
    <div className="post-container">
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>
      <div className="post">
        <h1>{post.frontmatter.title}</h1>
        <h2>by {post.frontmatter.author} on {post.frontmatter.date}</h2>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        { postHasTags &&
          <PostTags tags={post.frontmatter.tags} />
        }
      </div>
    </div>
  );
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
        tags
        author
        draft
      }
    }
  }
`;
