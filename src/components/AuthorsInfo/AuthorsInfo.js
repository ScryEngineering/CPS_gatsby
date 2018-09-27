import React from "react";
import PropTypes from 'prop-types';

import Author from "../Author/Author.js"

const siteConfig = require("../../../data/SiteConfig.js");

/* Extract the relevant author objects for
the given names from the collection of all_authors.

Note that since all_authors is literally all possible
authors */
function extract_authors(author_names, all_authors) {
  if (all_authors === undefined) {
    throw new Error('Missing parameter all_authors');
  }
  const authorNameList = author_names || [];
  return authorNameList.map(author => all_authors.find(x => x.node.frontmatter.name === author));
}

export default class AuthorsInfo extends React.Component {
  render() {
    const { authorNames, allAuthorsInfo } = this.props
    let authors = extract_authors(authorNames, allAuthorsInfo);
    console.log(authors)
    if (authors.length == 0) {
      authors = extract_authors([siteConfig.defaultAuthorName], allAuthorsInfo);
    }
    return (
      <div>
        {authors.map(author => (
          <Author name={author.node.frontmatter.name} authorLink={author.node.fields.internalURL} />
        ))}
      </div>
    );
  }
}

AuthorsInfo.propTypes = {
  allAuthorsInfo: React.PropTypes.array.isRequired
}
