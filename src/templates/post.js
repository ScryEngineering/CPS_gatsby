import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import PostTags from "../components/PostTags/PostTags";
import Masthead from '../components/Masthead/Masthead'
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

import styles from "./post.module.scss";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  const post = data.markdownRemark; // data.markdownRemark holds our post data
  const postHasTags = post.frontmatter.tags !== null && post.frontmatter.tags.length > 0
  const postHasCallToAction = post.frontmatter.hideCallToAction === null || post.frontmatter.hideCallToAction !== true
  const postHasCallToActionText = post.frontmatter.callToActionText !== null
  return (
    <div>
      <HelmetWrapper title={post.frontmatter.title} />
      <Masthead heading={post.frontmatter.title} paragraph={"Written by " + post.frontmatter.author + " on " + post.frontmatter.date + "."} />
      <div className="contentdiv">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        { postHasTags &&
          <PostTags tags={post.frontmatter.tags} />
        }
        {
          postHasCallToAction &&
            (
              postHasCallToActionText ?
              <ContactSnippet source={post.fields.slug} blurb={post.frontmatter.callToActionText} />
              :
              <ContactSnippet source={post.fields.slug} />
            )
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
        callToActionText
        hideCallToAction
      }
      fields {
        slug
      }
    }
  }
`;
