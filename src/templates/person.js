import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Masthead from '../components/Masthead/Masthead'

export default class PersonalAboutTemplate extends React.Component {
    render(){
      //Note that if 2 people have the exact same name this will fail
      const data = this.props.data.authors.edges[0].node;
      return (
        <div>
          <HelmetWrapper title={data.frontmatter.name} description={data.frontmatter.miniBlurb} />
          <Masthead heading={"About " + data.frontmatter.name} paragraph={data.frontmatter.bio + ", " + data.frontmatter.location} />
          <div className="contentdiv">
            <div className="post-content" dangerouslySetInnerHTML={{ __html: data.html }} />
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
}
`;
