/* Tag listing support */


import React from "react";
import PropTypes from "prop-types";

// Utilities
import kebabCase from "lodash/kebabCase";

// Components
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";
import Link from "gatsby-link";

import Masthead from '../components/Masthead/Masthead'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <div>
    <HelmetWrapper title="Tags" />
    <Masthead heading="Tags" />
    <div className="contentdiv">
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark (
      limit: 2000
      filter: {
        frontmatter: { draft: { ne: true } }
        fields: { isPost: { eq: true } }
      }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

