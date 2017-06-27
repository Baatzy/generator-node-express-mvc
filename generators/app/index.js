'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  prompting () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('node-express-mvc') + ' generator!'
    ))

    const dasherize = (name) => name.toLowerCase().split(' ').join('-')

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: dasherize(this.appname)
      },
      {
        type: 'confirm',
        name: 'eslint',
        message: 'Add .eslintrc with StandardJS?',
        default: true
      },
      {
        type: 'input',
        name: 'db',
        message: 'Database name',
        default: dasherize(this.appname)
      }
    ]).then(props => {
      this.props = props
      this.props.appName = dasherize(props.name)
      this.props.db = dasherize(props.db).replace(/-/g, '_')
    })
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('bin/www'),
      this.destinationPath(`bin/www`),
      { appName: this.props.appName }
    )

    const paths = [
      'controllers', 'db', 'lib', 'models', 'public', 'routes', 'views',
      '.env', '.gitignore', 'app.js', 'yarn.lock'
    ]
    paths.forEach(path => {
      this.fs.copy(
        this.templatePath(path),
        this.destinationPath(`${path}`)
      )
    })

    this.fs.copyTpl(
      this.templatePath('knexfile.js'),
      this.destinationPath(`knexfile.js`),
      { db: this.props.db }
    )

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`package.json`),
      { appName: this.props.appName }
    )

    if (this.props.eslint) {
      this.fs.copy(
        this.templatePath('.eslint*'),
        this.destinationPath(`.`)
      )
    }
  }

  install () {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    })

    this.log(chalk.inverse('IMPORTANT:'))
    this.log(`To finish setup:`)
    this.log(`\t1. Create your database. ${chalk.magenta(`createdb ${this.props.db}_dev`)}`)
    this.log(`\t2. Run the setup command. ${chalk.magenta(`npm run setup`)}`)
    this.log(`\t3. Start the server in dev mode. ${chalk.magenta(`npm run dev`)}\n`)
  }
}
