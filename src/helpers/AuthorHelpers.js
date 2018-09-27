import React from "react";
import Link from "gatsby-link";

import styles from "./AuthorHelpers.module.scss";

/* Extract the relevant author objects for
the given names from the collection of allAuthors. */
export function matchNamesToAuthors(authorNames, allAuthors) {
  if (allAuthors === undefined) {
    throw new Error("Missing parameter allAuthors");
  }
  const authorNameList = authorNames || [];
  return authorNameList.map(author => allAuthors.find(x => x.node.frontmatter.name === author));
}

const AuthorLink = props => <Link className={styles.link} to={props.author.node.fields.internalURL}>{props.author.node.frontmatter.name}</Link>;

/*
Given a set of authors, generates a line like this with links:
"Posted by Sam the Sample, Josh, and Mary on 15th of June"
*/
export function authorAndDateLine(authors, date) {
  let out = [];
  if (authors.length > 0) {
    out.push(<span>Posted by </span>);
    for (let i = 0; i < authors.length - 1; i++) {
      out.push(<span><AuthorLink author={authors[i]} />{i == authors.length - 2 ? "" : ","} </span>);
    }
    if (authors.length > 1) {
      out.push(<span>and </span>);
    }
    out.push(<span><AuthorLink author={authors[authors.length - 1]} /></span>);
  } else {
    out.push(<span>Posted</span>);
  }
  out.push(<span> on {date}.</span>);
  return out;
}