/*
This component exists to list posts such as tutorial or blog post
*/

import React from "react";
import Link from "gatsby-link";

import styles from "./PostListing.module.scss"
import PostTags from "../PostTags/PostTags";
import AuthorsInfo from "../AuthorsInfo/AuthorsInfo";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        authors: postEdge.node.frontmatter.author,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        draft: postEdge.node.frontmatter.draft
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    const nonDraftPosts = postList.filter(post => post.draft !== true);
    return (
      <div className={styles.postContainer}>
        {
        nonDraftPosts.map(post => (
        <div className={styles.post}>
          <h2><Link to={post.path} key={post.title} className={styles.postTitle}>{post.title}</Link></h2>
          <Link to={post.path} className={styles.summarytext}>
            <p>{post.excerpt}</p>
          </Link>
          <AuthorsInfo authorNames={post.authors} allAuthorsInfo={this.props.allAuthorsInfo}/>
          <PostTags tags={post.tags} />
         </div>
        ))}
      </div>
    );
  }
}

export default PostListing;