// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'retoPaises',
        // URL to the GraphQL API
        url: 'https://countries.trevorblades.com/',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }