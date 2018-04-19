import React from "react";
import PropTypes from 'prop-types';

import Author from "../Author/Author.js"

const siteConfig = require("../../../data/SiteConfig.js");

/* Extract the relevant author objects for
the given names from the collection of all_authors.

Note that since all_authors is literally all possible
authors */
function extract_authors(author_names, all_authors){
  if(author_names === undefined){
    throw new Error('Missing parameter author_names');
  }
  if(all_authors === undefined){
    throw new Error('Missing parameter all_authors');
  }
  const authorsList = [];
  if (typeof author_names === 'string'){
      /* handle case where single author is provided as a string */
    author_names = [author_names];
  }
  for (let authorname of author_names) {
    const current_author_obj = all_authors.find(x => x.node.name === authorname)
    authorsList.push(current_author_obj)
  }
  return authorsList;
}

export default class AuthorsInfo extends React.Component{
  render(){
    const { authorNames, allAuthorsInfo } = this.props
    let authors = [];
    if (authorNames === undefined || authorNames === null){
      /* handle the case where the post has no author information attached */
      authors = extract_authors(siteConfig.defaultAuthorName, allAuthorsInfo)
    } else {
      authors = extract_authors(authorNames, allAuthorsInfo)
    }
    return(
      <div>
        {authors.map(author => (
        <Author name={author.node.name} authorLink={author.node.fields.internalURL}/>
      ))}
      </div>
    );
  }
}

AuthorsInfo.propTypes = {
  allAuthorsInfo: React.PropTypes.array.isRequired
}
