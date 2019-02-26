const config = require("./data/SiteConfig.js");

module.exports = {
  siteMetadata: {
    title: 'Custom Programming Solutions',
    description: `A versatile programming, software development and consulting firm driven by trusted industry experts.`,
    siteUrl: config.siteUrl,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tutorials`,
        path: `${config.contentDir}/content/tutorial-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${config.contentDir}/content/blog-posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `people`,
        path: `${config.contentDir}/content/people`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `faces`,
        path: `${config.contentDir}/content/faces`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `services`,
        path: `${config.contentDir}/content/services`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end excerpt -->`,
        plugins: [
          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 960,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-sass`
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: {
                  order: DESC,
                  fields: [frontmatter___date]
                },
                filter: {
                  fields: { isPost: { eq: true } },
                  frontmatter: { draft: { ne: true } }
                }
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                    }
                    fields {
                      slug
                    }
                    excerpt
                    html
                  }
                }
              }
            }`,
            output: `/rss.xml`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        icons: {
          android: false,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    }
  ],
};
