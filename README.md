[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/FSA-GRP1-2001/instastack.svg?branch=master)](https://travis-ci.org/FSA-GRP1-2001/instastack)

### Developer Quick Start

Clone this repo. run `npm i` or `npm install` to install the project and its dependencies. Set up a postgres database named `instastack` and `instastack-test` (You will also want to install postgres locally, and provision postgres when you deploy remotely)

To seed the database, run `npm run seed`, after that, the tests should pass when you run `npm test`.

Then `npm run start-dev` to start dev mode, serving up on localhost:8080 with webpack watching for changes.

# InstaStack ([Live](https://instastack.herokuapp.com/))
## (c) The InstaStack Team, 2020
### Tina Sosa, Joshua Skootsky, Maxwell Han, and Mercedes Madanire

#### Marketing copy:

Designers and web developers often wish they could translate their vision into real HTML and CSS.

InstaStack makes it possible to quickly create, for real, a static website whose HTML and CSS is the same as the preview image. This HTML is suitable on its own, or for combining with an external style sheet and handwritten HTML. It may be made by a machine, but that machine was made by humans for humans.

![](https://user-images.githubusercontent.com/32972737/78846598-4ecb5000-79da-11ea-849d-9e3c2436d929.gif)

#### Tech Stack & Features

## Drag and Drop Interface

- Select your web components and drag them into the preview area to add items to your project
- add, resize, and rearrange containers to create the layout of your liking

We use the [Browser API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) for drag and drop to move DOM nodes from one place to another. We have to make a copy of the original to get moved, and wrote our own cleanup routine in JavaScript that deletes the extra node (DOM manipulation) if the drop is not successful.

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
Code goes from React to the Redux Store. En route it gets formatted by a beautifier, then from the Redux Store, a Code Mirror React component displays it. The code mirror is displayed by a Prime React sliding window when the user clicks on it.


## Prime React Component Library

## React Grid 
Canvas built with react grid layout
We needed additional logic so that it was smart enough to accept drop events and resize depending on the items.

## Prime React
The [React component libary of the Prime Faces UI library](https://primefaces.org/primereact/showcase/#/), this library gave us toast notifications, forms, buttons and a unified, modern look and feel. To get this to work, we had to make special configurations to WebPack.

## OAuth
We used GitHub and Google OAuth to allow users to authenticate themselves using their GitHub and Google credentials - without needing to know the passwords to their accounts!

## Postgres
Our database was Postgres, an SQL standard compliant relational database. We chose Postgres because it is very well supported by Cloud providers like Heroku, AWS RDS, Google Cloud, and Microsoft Azure.

## Sequelize:
We used Sequelize, an object relational mapper (ORM), to translate the data on our server as JavaScript objects into SQL, and to read from the database and translate its SQL data into JavaScript objects.

## Node.js
Our server's runtime is Node.js, an open-source, asynchronous runtime for JavaScript outside of the browser, allowing for the "JavaScript everywhere" paradigm.

## Express
Our API, server routes, and static assets are all served up by Express and its routing.

## React
A JavaScript library for building User  interfaces,  it allows for modular components to be used in a declarative style, allowing for both object oriented and functional programming paradigms on the front end.

## Redux
We used Redux as a way of managing application level state, allowing different components to update and read from the Redux store, without us needing to worry about where those components were.


## Webpack
All our React and Redux code is bundled together into one production ready file with [Webpack](https://webpack.js.org/). Some special configuration was necessary to use the Prime styles with Webpack.

## Linting and Style

We used Prettier with reasonable defaults, and automated ESLint running on commit to git, using Husky for pre-commit hooks.



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

