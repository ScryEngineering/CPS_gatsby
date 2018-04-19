import React from "react";
import Helmet from 'react-helmet'

export default class PersonalAboutTemplate extends React.Component {
    render(){
      console.log("PersonalAboutTemplate props", this.props)
      //Note that if 2 people have the exact same name this will fail
      const currentPerson = this.props.data.allPeopleJson.edges[0].node;
      console.log("current person", currentPerson);

      return (
        <div>
          <Helmet>
            <title>About {currentPerson.name}</title>
          </Helmet>
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