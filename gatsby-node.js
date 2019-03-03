/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs");
const siteConfig = require("./data/SiteConfig.js");

const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

const createPostNode = (node, getNode, createNodeField, fileSourcePath, pageType)=> {
  if(!(pageType === "blog" || pageType === "tutorial")){
    throw new Error(`Only "blog" and "tutorial" are supported for pageType, got: ${pageType}`);
  }
  const slug = createFilePath({
    node,
    getNode,
    basePath: fileSourcePath,
  })
  createNodeField({
    node,
    name: `slug`,
    value: `/${pageType}${slug}`,
  })
}

/* Creation of nodes includes a step where we take the directory the nodes were found in
then make a flag to mark the type of node based on where it came from in the content directory.
This is needed because it's hard to actually extract where a MarkdownRemark page came
from after the fact when constructing the GraphQL queries. */
exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    let isOfType = name => node.fileAbsolutePath.includes(`content/${name}/`)
    let pageType; // default to blog post
    if (isOfType("tutorial-pages")) {
      createPostNode(node, getNode, createNodeField, "content/tutorial-pages", "tutorial")
      pageType = "tutorial";
    } else if (isOfType("blog-posts")) {
      createPostNode(node, getNode, createNodeField, "content/blog-posts", "blog")
      pageType = "blog";
    } else if (isOfType("people")) {
      createNodeField({
        node,
        name: `internalURL`,
        value: `/about/${_.kebabCase(node.frontmatter.name)}/`,
      })
      pageType = "person";
    } else if (isOfType("services")) {
      createNodeField({
        node,
        name: `internalURL`,
        value: `/services/${_.kebabCase(node.frontmatter.name)}/`,
      })
      pageType = "service";
    } else {
      throw new Error(`Unknown markdown document encountered: ${node}`)
    }
    createNodeField({
      node,
      name: `contentType`,
      value: pageType,
    })
    createNodeField({
      node,
      name: `isPost`,
      value: pageType === "tutorial" || pageType === "blog",
    })
    createNodeField({
      node,
      name: `isPerson`,
      value: pageType === "person",
    })
    createNodeField({
      node,
      name: `isService`,
      value: pageType === "service",
    })
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const tagPage = path.resolve("src/templates/tag.js");
  const authorPage = path.resolve("src/templates/person.js");
  const postPage = path.resolve("src/templates/post.js");
  const servicePage = path.resolve("src/templates/service.js");

  return new Promise((resolve, reject) => {
    if (
      !fs.existsSync(
        path.resolve(`content/people/`)
      )
    ) {
      reject(
        "The 'people' folder is missing within the 'content' folder."
      );
    }
    if (
      !fs.existsSync(
        path.resolve(`content/services/`)
      )
    ) {
      reject(
        "The 'services' folder is missing within the 'content' folder."
      );
    }



    graphql(`
      {
        allMarkdownRemark (filter: { fields: { isPerson: { eq: true } } }) {
          edges {
            node {
              frontmatter {
                name
              }
              fields {
                internalURL
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        reject(result.errors);
      }

      console.log("Creating personal about pages")
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.internalURL,
          component: authorPage,
          context: {
            author: node.frontmatter.name
          }
        });
      });

      graphql(`
        {
          allMarkdownRemark (
            filter: {
              fields: {
                isPost: { eq: true }
              }
              frontmatter: {
                draft: { ne: true }
              }
            })
          {
            edges {
              node {
                frontmatter {
                  tags
                  draft
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        const tagSet = new Set();

        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }
        });

        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        console.log("Creating markdown pages")
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          if (node.frontmatter.draft !== true) {
            const pagePath = node.fields.slug
            createPage({
              path: pagePath,
              component: postPage,
              context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: pagePath,
              },
            })
          }
        });


        graphql(`
        {
          allMarkdownRemark (
            filter: {
              fields: {
                isService: { eq: true }
              }
              frontmatter: {
                draft: { ne: true }
              }
            })
          {
            edges {
              node {
                frontmatter {
                  name
                }
                fields {
                  internalURL
                }
              }
            }
          }
        }
      `).then(result => {
          if (result.errors) {
            /* eslint no-console: "off" */
            console.log(result.errors);
            reject(result.errors);
          }

          console.log("Creating service pages")
          result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
              path: node.fields.internalURL,
              component: servicePage,
              context: {
                service: node.frontmatter.name
              }
            });
          });
          resolve()
        })
      })
    })
  })
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
