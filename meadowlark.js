const Express = require('express')
const handlebars = require('express3-handlebars').create({ 'defaultLayout': 'main' })

const app = new Express()

app.engine('handlebars', handlebars.engine)
app.set('port', process.env.port || 3000)
app.set('view engine', 'handlebars')

app.use(Express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.render('home')
})

const aboutArr = ['大象', '狮子', '老虎', '狐狸']

app.get('/about', (req, res) => {
  const type = aboutArr[Math.floor(Math.random() * aboutArr.length)]
  res.render('about', { type })
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
  console.log(`Express start on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`)
})