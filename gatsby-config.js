module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-paypal`,
      options: {
        clientId: `AfT8aC1gkayVTl9gP4PBbifGpV9e1Ki-NBG8BN1wxNSpQW_N2-accMva485YaNZpVFjmZVQOjchOpHxi`,
        currency: `USD`, // Optional
        vault: true, // Optional
      },
    },
  ],
};
