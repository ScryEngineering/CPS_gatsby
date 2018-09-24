import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import PostTags from "../components/PostTags/PostTags";
import Masthead from '../components/Masthead/Masthead'
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

import styles from "./post.module.scss";
import AuthorSection from "../components/AuthorSection/AuthorSection";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  const post = data.markdownRemark; // data.markdownRemark holds our post data
  const postHasTags = post.frontmatter.tags !== null && post.frontmatter.tags.length > 0
  const postHasCallToAction = post.frontmatter.hideCallToAction === null || post.frontmatter.hideCallToAction !== true
  const postHasCallToActionText = post.frontmatter.callToActionText !== null
  const authorNameList = post.frontmatter.author instanceof Array ? post.frontmatter.author : (post.frontmatter.author === null ? [] : [post.frontmatter.author]);
  const allAuthors = data.authors.edges;
  const authors = authorNameList.map(author => allAuthors.find(x => x.node.frontmatter.name === author));
  const postHasAuthor = authors.length != 0;
  return (
    <div>
      <HelmetWrapper title={post.frontmatter.title} description={post.excerpt} />
      <Masthead heading={post.frontmatter.title} paragraph={"Written by " + post.frontmatter.author + " on " + post.frontmatter.date + "."} />
      <div className="contentdiv">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        { postHasAuthor &&
          (
            <section>
              <h2>About the authors</h2>
              {authors.map(author =>
                <AuthorSection person={author.node} images={data.allImages.edges} />
              )}
            </section>
          )
        }
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
    # authors
    authors: allMarkdownRemark (
      filter: {
        fields: { isPerson: { eq: true } },
        frontmatter: { teamMember: { eq: true } }
      }
    ) {
      edges {
        node {
          frontmatter {
            name
            image
            url
            location
            bio
            socialUrls
            shortBlurb
            miniBlurb
          }
          fields {
            internalURL
          }
        }
      }
    }
    allImages: allFile {
      edges {
        node {
          relativePath
          childImageSharp {
            sizes(maxWidth: 500) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
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
