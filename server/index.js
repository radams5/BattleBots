require('dotenv').config()
const express = require('express'),
  massive = require('massive')
  ctrl = require('./controller')

  const app = express(),
    {SERVER_PORT, CONNECTION_STRING, } =  process.env

  app.use( express.static( `${__dirname}/../build` ) );

  app.use(express.json())

  app.use( express.static( `${__dirname}/../build` ) );

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db connected')
  const PORT=SERVER_PORT
  app.listen(PORT, () => console.log('I wanna be the very best'))
}).catch((err) => {
  console.log('looks like massives blasting off again', err)
})

middleware = (req, res, next) => {
  let x = true
  if(x===true){
    console.log('I am effective middleware')
    next()
  }else{console.log(' this middleware seems to be ineffective')}

}

// -----------get Endpoints -----------//
  app.get('/api/getbotsfromdb', middleware, ctrl.getBots)
  app.put('/api/createBot', middleware, ctrl.createBot)
  app.put('/api/deletebot', middleware, ctrl.deleteBot)

