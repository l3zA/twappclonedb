const express = require ('express')

const morgan = require('morgan')
const methodOverride = require('method-override');

const app = express()

const users = require('./routes/users')

const tweets = require('./routes/tweets')

app.use(express.static('public'))
app.use(methodOverride('_method'));

app.use(morgan('combined'))

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/users', users)

app.use('/tweets', tweets)

app.all('*', function(rq, rs){
  rs.redirect('/users/login')
})

app.listen(3000)
