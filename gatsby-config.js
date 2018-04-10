module.exports = {
  siteMetadata: {
    title: 'Custom Programming Solutions',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tutorials`,
        path: `${__dirname}/src/tutorial-pages`,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
  ],
};
