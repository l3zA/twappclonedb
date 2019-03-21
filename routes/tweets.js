const express = require('express')
const bodyParser = require('body-parser')
const Model = require('../models')
const rounter = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: true})

rounter.route('/new').get(function(rq, rs){
  let user = ""
  if(Model.isLogin())
    user = Model.session
  else
    rs.redirect('/users/login')
  rs.render('tweets/new', { user : user})
})

rounter.route('/:id/edit').get(urlencodedParser, async function(rq, rs){
  let user = ""
  if(Model.isLogin())
    user = Model.session
  else
    rs.redirect('/users/login')
  const { id } = rq.params
  const tweet = await Model.Tweet.findOne({ where: { id: id }, raw: true})
  if(typeof tweet !== 'undefined')
    rs.render('tweets/edit', { user : tweet.user, id : id, msg : tweet.msg })
  else
    rs.redirect('/tweets')
})

rounter.route('/:id').get(urlencodedParser, async function(rq, rs){
  let user = ""
  if(Model.isLogin())
    user = Model.session
  else
    rs.redirect('/users/login')
  const { id } = rq.params
  const tweet = await Model.Tweet.findOne({ where: { id: id }, raw: true})
  if(typeof tweet !== 'undefined')
    rs.render('tweets/get', { user : tweet.user, id : id, msg : tweet.msg })
  else
    rs.redirect('/tweets')
}).put(urlencodedParser, async function(rq, rs){
  let user = ""
  if(Model.isLogin())
    user = Model.session
  else
    rs.redirect('/users/login')
  const { id } = rq.params
  const { msg } = rq.body
  await Model.Tweet.update({ msg: msg }, { where :{id, id} });
  
  rs.redirect('/tweets')
}).delete(urlencodedParser, async function(rq, rs){
  let user = ""
  if(Model.isLogin())
    user = Model.session
  else
    rs.redirect('/users/login')
  const { id } = rq.params
  await Model.Tweet.destroy({ where: { id: id }})
  rs.redirect('/tweets')
})

rounter.route('/').get(async function(rq, rs){
  let user = ""
  if(Model.isLogin()){
    user = Model.session
  }else
    rs.redirect('/users/login')
  const tweets = await Model.Tweet.findAll({ raw: true, order: [[ 'id', 'DESC' ]] })
  rs.render('tweets/index', { tweets: tweets, user : user})
}).post(urlencodedParser, async function(rq, rs){
  let user = ""
  if(Model.isLogin())
    user = Model.session
  else
    rs.redirect('/users/login')
  const { msg } = rq.body
  await Model.Tweet.create({ user: user, msg: msg})
  rs.redirect(`/tweets`)
})

module.exports = rounter