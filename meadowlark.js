const Express = require('express')
const handlebars = require('express3-handlebars').create({
  defaultLayout: 'main',
})
const fortune = require('./lib/fortune')

const app = new Express()

app.engine('handlebars', handlebars.engine)
app.set('port', process.env.port || 3000)
app.set('view engine', 'handlebars')

app.use(Express.static(`${__dirname}/public`))
app.use((req, res, next) => {
  res.locals.showTests =
    app.get('env') !== 'production' && req.query.test === '1'
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})
app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river')
})
app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate')
})

app.get('/about', (req, res) => {
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js',
  })
})
app.get('/headers', function (req, res) {
  res.set('Content-Type', 'text/plain')
  var s = ''
  for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n'
  res.send(s)
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), () => {
  console.log(
    `Express start on http://localhost:${app.get(
      'port'
    )}; press Ctrl-C to terminate.`
  )
})
