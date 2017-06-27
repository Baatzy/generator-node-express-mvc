# generator-node-express-mvc [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Node/Express application with an MVC architecture

## Installation

First, install [Yeoman](http://yeoman.io) and generator-node-express-mvc using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

To use any of the database features, you'll want [PostgreSQL installed](pg-url). We'd recommend installing with [Homebrew](brew-url) if you're on a Mac.

```bash
npm install -g yo
npm install -g generator-node-express-mvc
```

Then generate your new project:

```bash
yo node-express-mvc
```

Follow the instructions at the end to setup your database and start the dev server.

```bash
createdb [YOUR DB NAME]_dev
npm run setup
npm run dev
```

## Tools & Libraries

* [Yeoman](http://yeoman.io/)
* [ESLint](http://eslint.org/)
* [Dotenv](https://github.com/motdotla/dotenv)
* [Express](https://expressjs.com/)
* [req-flash](https://github.com/maximilianschmitt/req-flash)
* [Passport](http://passportjs.org/)
* [Knex.js](http://knexjs.org/) & [Objection.js](https://vincit.github.io/objection.js/)
* [EJS](http://www.embeddedjs.com/)

## License

MIT © [Wes Reid](http://bwreid.github.io)

[npm-image]: https://badge.fury.io/js/generator-node-express-mvc.svg
[npm-url]: https://npmjs.org/package/generator-node-express-mvc
[daviddm-image]: https://david-dm.org/bwreid/generator-node-express-mvc.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bwreid/generator-node-express-mvc
[pg-url]: https://www.postgresql.org/download/macosx
[brew-url]: https://www.postgresql.org/download/macosx#homebrew
