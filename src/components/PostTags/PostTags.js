import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";

import styles from './PostTags.module.scss'

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className={styles.tagContainer}>
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              className={styles.tag}
              to={`/tags/${_.kebabCase(tag)}`}
            >
              {tag}
            </Link>
          ))}
      </div>
    );
  }
}

export default PostTags;