if (process.env.NODE_ENV !== 'production') { require('dotenv').load() }

const express = require('express')
const path = require('path')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(require('express-partials')())

// uncomment after placing your favicon in /public
app.use(require('serve-favicon')(path.join(__dirname, 'public', 'favicon.ico')))
app.use(require('morgan')('dev'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('cookie-parser')())
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(require('req-flash')())
app.use(express.static(path.join(__dirname, 'public')))

const auth = require('./lib/auth')
const passport = auth.init()

app.use(passport.initialize())
app.use(passport.session())

// routes
const sessions = require('./routes/sessions')
const users = require('./routes/users')
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  res.locals.user = req.user || {}
  next()
})
app.use('/', sessions)
app.use('/', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
