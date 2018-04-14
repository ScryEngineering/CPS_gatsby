import React from "react";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  const post = data.markdownRemark; // data.markdownRemark holds our post data
  const postHasTags = post.frontmatter.tags !== null && post.frontmatter.tags.length > 0
  return (
    <div className="tutorial-post-container">
      <div className="tutorial-post">
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.date}</h2>
        <div
          className="tutorial-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        { postHasTags &&
          <div>This post has some tags</div>
        }
      </div>
    </div>
  );
}

export const query = graphql`
  query TutorialPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
        tags
      }
    }
  }
`;
