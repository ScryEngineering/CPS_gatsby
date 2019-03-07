import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import AuthorSection from "../components/AuthorSection/AuthorSection";
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";
import Masthead from "../components/Masthead/Masthead";
import PostTags from "../components/PostTags/PostTags";

import { matchNamesToAuthors, authorAndDateLine } from "../helpers/AuthorHelpers";

export default function Template({
  // this prop will be injected by the GraphQL query below.
  data,
}) {
  // data.markdownRemark holds our post data
  const post = data.markdownRemark;
  const postHasTags = post.frontmatter.tags !== null && post.frontmatter.tags.length > 0;
  const postHasCallToAction = post.frontmatter.hideCallToAction === null || post.frontmatter.hideCallToAction !== true;
  const postHasCallToActionText = post.frontmatter.callToActionText !== null;
  const authors = matchNamesToAuthors(post.frontmatter.authors, data.authors.edges);
  return (
    <div>
      <HelmetWrapper title={post.frontmatter.title} description={post.excerpt} />
      <Masthead heading={post.frontmatter.title} paragraph={authorAndDateLine(authors, post.frontmatter.date)} />
      <div className="contentdiv">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        { authors.length > 0 &&
          (
            <section>
              <h2>About the {authors.length > 1 ? "authors" : "author"}</h2>
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
        fields: { isPerson: { eq: true } }
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
        date(formatString: "MMMM Do, YYYY")
        title
        tags
        authors
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
