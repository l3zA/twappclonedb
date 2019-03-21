const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://localhost:5432/twappclonedb')
const connect = async function(){
  try {
    await sequelize.authenticate()
    console.log('Connected to Database!')
  } catch (e) {
    console.log('Cannot setup db connection! ' + e)
  }
}

const User = function(sequelize, type){
  return sequelize.define('user', {
    id: {
      primaryKey: true,
      type: type.INTEGER,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      unique: true
    },
    password: type.STRING
  });
}

const Tweet = function(sequelize, type){
  return sequelize.define('tweet', {
    id: {
      primaryKey: true,
      type: type.INTEGER,
      autoIncrement: true
    },
    user: {
      type: type.STRING
    },
    msg: type.STRING
  });
}

const session = ""
const isLogin = function(){
  return this.session != '' && this.session != null
}

module.exports = {
  connect,
  User: User(sequelize, Sequelize),
  Tweet: Tweet(sequelize, Sequelize),
  session: session,
  isLogin: isLogin
}