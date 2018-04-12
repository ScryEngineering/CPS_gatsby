/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `data/tutorial-pages`,
    })
    createNodeField({
      node,
      name: `slug`,
      value: `/tutorials${slug}`,
    })
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      console.log(JSON.stringify(result, null, 4))
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const tutorialPagePath = node.fields.slug
        createPage({
          path: tutorialPagePath,
          component: path.resolve(`./src/templates/tutorial-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: tutorialPagePath,
          },
        })
      })
      resolve()
    })
  })
};

