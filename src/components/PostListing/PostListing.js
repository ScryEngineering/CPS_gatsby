/*
This component exists to list posts such as tutorial or blog post
*/

import React from "react";
import Link from "gatsby-link";

import styles from "./PostListing.module.scss";
import PostTags from "../PostTags/PostTags";

import { matchNamesToAuthors, authorAndDateLine } from "../../helpers/AuthorHelpers";

export default class PostListing extends React.Component {
  render() {
    const postList = this.props.postEdges;
    const nonDraftPosts = postList.filter(post => post.node.frontmatter.draft !== true);
    let displayedPosts = nonDraftPosts;
    console.log(displayedPosts)
    if (this.props.filter) {
      displayedPosts = nonDraftPosts.filter(this.props.filter);
    }
    return (
      <div className={styles.postContainer}>
        <h4>{displayedPosts.length} Posts</h4>
        {
        displayedPosts.map(post => (
        <div className={styles.post}>
          <h3><Link to={post.node.fields.slug} key={post.node.frontmatter.title} className={styles.postTitle}>{post.node.frontmatter.title}</Link></h3>
          <Link to={post.node.fields.slug} className={styles.summarytext}>
            <p>{post.node.excerpt}</p>
          </Link>
          {authorAndDateLine(matchNamesToAuthors(post.node.frontmatter.authors, this.props.allAuthorsInfo), post.node.frontmatter.date)}
          <PostTags tags={post.node.frontmatter.tags} />
         </div>
        ))}
      </div>
    );
  }
}