const Express = require('express')
const app = new Express()

app.set('port', process.env.port || 3000)
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(app.get('port'), () => {
  console.log(`Express start on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`)
})