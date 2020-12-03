module.exports = {
  siteMetadata: {
    title: `Padelman`,
    description: `Synchronize padel times between groups of frirends`,
    author: `Pär Linder`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Padelman`,
        short_name: `Padelman`,
        start_url: `/`,
        background_color: `#343434`,
        theme_color: `#EFAD88`,
        display: `standalone`,
        icon: `src/images/padelman-icon.png`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
