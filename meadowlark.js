const Express = require('express')
const handlebars = require('express3-handlebars').create({
  defaultLayout: 'main',
})
const fortune = require('./lib/fortune')

const app = new Express()

app.engine('handlebars', handlebars.engine)
app.set('port', process.env.port || 9000)
app.set('view engine', 'handlebars')

app.use(Express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() })
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
