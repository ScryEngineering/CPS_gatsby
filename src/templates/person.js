import React from "react";

export default class PersonalAboutTemplate extends React.Component {
    render(){
      const currentPerson = this.props.data.allPeopleJson.edges[0].node;
      console.log("this.props.data.allPeopleJson", this.props.data.allPeopleJson)
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