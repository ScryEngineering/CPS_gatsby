import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

export default class PersonalAboutTemplate extends React.Component {
    render(){
      //Note that if 2 people have the exact same name this will fail
      const currentPerson = this.props.data.authors.edges[0].node.frontmatter;
      console.log("current person", currentPerson);

      const title_text = `About ${currentPerson.name}`;
      return (
        <div>
          <HelmetWrapper title={title_text} />
          <h1>
            About {currentPerson.name}
          </h1>
          <div>
            Bio: <p>{currentPerson.bio}</p>
          </div>
          <div>
            Website: <p>{currentPerson.url}</p>
          </div>
          <div>
            Location:<p>{currentPerson.location}</p>
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