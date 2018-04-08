module.exports = {
  siteMetadata: {
    title: 'Custom Programming Solutions',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-plugin-react-helmet'
  ],
};
