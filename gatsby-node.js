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

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {

  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    console.log("creating node", node)
    if(node.frontmatter.contentType === "tutorial"){
      const slug = createFilePath({
        node,
        getNode,
        basePath: `content/tutorial-pages`,
      })
      createNodeField({
        node,
        name: `slug`,
        value: `/tutorials${slug}`,
      })
    } else if(node.frontmatter.contentType === "blog"){
      const slug = createFilePath({
        node,
        getNode,
        basePath: `content/blog-posts`,
      })
      createNodeField({
        node,
        name: `slug`,
        value: `/blog${slug}`,
      })
    } else {
      console.log("No contentType was found in the frontmatter, \
creating blog post as a defualt for: ", node)
      const slug = createFilePath({
        node,
        getNode,
        basePath: `content/blog-posts`,
      })
      createNodeField({
        node,
        name: `slug`,
        value: `/blog${slug}`,
      })
    }
  }
  if (node.internal.type === `PeopleJson`) {
    createNodeField({
      node,
      name: `internalURL`,
      value: `/about/${_.kebabCase(node.name)}/`,
    })
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const tagPage = path.resolve("src/templates/tag.js");
  const authorPage = path.resolve("src/templates/person.js");

  return new Promise((resolve, reject) => {
    if (
      !fs.existsSync(
        path.resolve(`content/${siteConfig.peopleDir}/`)
      )
    ) {
      reject(
        "The 'people' folder is missing within the 'content' folder."
      );
    }

    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
                author
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
      const authorSet = new Set();
      authorSet.add(siteConfig.defaultAuthorName);

      result.data.allMarkdownRemark.edges.forEach(edge => {
        if (edge.node.frontmatter.tags) {
          edge.node.frontmatter.tags.forEach(tag => {
            tagSet.add(tag);
          });
        }
        if (edge.node.frontmatter.author) {
          authorSet.add(edge.node.frontmatter.author);
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
      console.log(JSON.stringify(result, null, 4))
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if(node.frontmatter.draft === true){
          console.log("Skipping page creation for page ",
                      node.fields.slug, "as it is marked as a draft");  
        }else{
          const tutorialPagePath = node.fields.slug
          createPage({
            path: tutorialPagePath,
            component: path.resolve(`./src/templates/tutorial-post.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: tutorialPagePath,
            },
          })
        }
      });
      console.log("Creating personal about pages")
      const authorList = Array.from(authorSet);
      console.log("With authors:", authorList)
      authorList.forEach(author => {
        createPage({
          path: `/about/${_.kebabCase(author)}/`,
          component: authorPage,
          context: {
            author
          }
        });
      });

      resolve()
    })
  })
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};