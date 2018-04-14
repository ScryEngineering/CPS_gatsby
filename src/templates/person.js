import React from "react";

export default class PersonalAboutTemplate extends React.Component {
    render(){
      //const name = this.props.data.name;

      return (
        <div>
          <h1>
            About (individual)
          </h1>
        </div>
      );
    }
};

  /* eslint no-undef: "off" */
export const pageQuery = graphql`
query AuthorPage($author: String) {
  allPeopleJson(filter: { id: { eq: $author } }) {
    edges {
      node {
        id
        name
        image
        url
        bio
        location
        socialUrls
      }
    }
  }
}
`;