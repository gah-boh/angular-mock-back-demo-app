# Angular Mock Back Demo App

Sample application for [angular mock back](https://github.com/gah-boh/angular-mock-back)

## Setup

This assumes you have [bower](https://github.com/bower/bower) and [gulp](https://github.com/gulpjs/gulp/) installed globally.

- Clone the repo
- Run `bower install`
- Run `npm install`

## Running

- To create the mock backend index file run `gulp`
- Run the server with `node serve`
- The url for the mocked version of the app is `localhost:9000/index-mb.html`

The angular mock back config is located in  `app/mock-backend/mock-backend-config.js`

## Overrides

For a user in view only mode:

- `localhost:9000/index-mb?noEdit`

To see "advanced settings":

- `localhost:9000/index-mb?advancedSettings`

For no edit user and advanced settings:

- `localhost:9000/index-mb?noEdit&advancedSettings`

