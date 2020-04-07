[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/FSA-GRP1-2001/instastack.svg?branch=master)](https://travis-ci.org/FSA-GRP1-2001/instastack)

# InstaStack ([Live](https://instastack.herokuapp.com/))

## (c) The InstaStack Team, 2020

### Tina Sosa, Joshua Skootsky, Maxwell Han, and Mercedes Madanire

#### Marketing copy:

Designers and web developers often wish they could translate their vision into real HTML and CSS.

InstaStack makes it possible to quickly create, for real, a static website whose HTML and CSS is the same as the preview image. This HTML is suitable on its own, or for combining with an external style sheet and handwritten HTML. It may be made by a machine, but that machine was made by humans for humans.

#### Tech Stack


### Built with Express, Sequelize, Postgres, React, and Redux

This project uses Node.js and Express for the server, Sequelize as an ORM to talk to a Postgres database, React for display components, and Redux for managing state on the front end.

### Twelve Factor Design

This project uses the [Twelve Factor App](https://12factor.net/ 'Twelve Factor App') design principles. To quote the author, [Adam Wiggins](https://news.ycombinator.com/item?id=21416881 'Comment on Hacker News'):

> I'm the author of 12factor (although really it is an aggregation of the work and insights from many people at Heroku). It continues to surprise and please me that this piece continues to be relevant eight years later—a virtual eternity in software/internet time.
> Fun fact: I debated whether to call it "the Heroku way" or somesuch. Glad I went with a standalone name, feel like that allowed it to take on a life beyond that product. For example I doubt Google would have wanted a page about "Heroku Way app development on GCP" in their documentation. :-)

We deployed to Heroku, but the same DevOps principles would have allowed us to deploy to AWS, Google Cloud, Microsoft Azure, or another cloud computing service.


### Continuous Deployment

Our app is continuously deployed from the `master` branch on GitHub, Embracing a DevOps philosophy from the beginning allowed us to focus on the user experience of using our website, rather than thinking about the app in terms of how it behaves on localhost:8080

### Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [React](https://facebook.github.io/react/)
- [Redux](https://redux.js.org/)
- [HTML Drag-and-Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [Webpack](https://webpack.js.org/)
- [PrimeReact (UI)](https://primefaces.org/primereact/showcase/#/)


# Features

## Drag and Drop Interface

- Select your web components and drag them into the preview area to add items to your project
- add, resize, and rearrange containers to create the layout of your liking

## Styling Menu for Customization of Web Components

- Once you have added items to your project, customize the text, look and feel with the styling menu
- Customize different types of components (lists, paragraphs, simple text, images... )

## Preview Design + Access Live HTML Code

- View a live rendering of your project with one click
- HTML code is available for export with every change your make

## Logged-in User Experience

- Users have the option of creating an account, via email signup or Google OAuth GitHub OAuth
- Users with an account can return at at any time to their projects, which are persisted in our Postgres database

## Database Schema

Database interactions were handled via an ORM, [Sequelize]([https://sequelize.org/]). We stored the HTML default components in the database, and dynamically read them from the database. This allows users to create and save their own default components.

## Code Mirror

![Code Mirror](https://i.imgur.com/lpnoVqQ.png)

The app features a live code mirror. After a component is dragged and dropped, the HTML and CSS dispatched from React into the Redux store and is formatted with a beautifier along the way. From the Redux store, the formatted code is displayed with syntax highlighting in a code mirror, and optionally copied to the user's clipboard on click.

## Prime React Component Library


Pictures of the APP PLEASE!

## Linting and Style

We used Prettier with reasonable defaults, and automated ESLint running on commit to git, using Husky for pre-commit hooks.
