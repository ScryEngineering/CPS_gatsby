import React from "react";

export default class PersonalAboutTemplate extends React.Component {
    render(){
      console.log("PersonalAboutTemplate props", this.props)

      const currentPerson = this.props.data.allPeopleJson.edges[0].node;
      console.log("current person", currentPerson);

      return (
        <div>
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
  //TODO: this query is failing because it doesn't match the required info over in gatsby-node
export const pageQuery = graphql`
query AuthorPage($author: String) {
  allPeopleJson(filter: { name: { eq: $author } }) {
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