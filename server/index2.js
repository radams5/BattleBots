const express = require('express')
ctrl = require('./controller')

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

require('dotenv').config()

const app = express()
const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())


const url = 'mongodb://localhost:27017'
MongoClient.connect(url, { useNewUrlParser: true }, (err, Mongodb) => {
  if (err) { return err }
  else {
    const db = Mongodb.db('nodemon')
    const collection = db.collection('user')
    app.set('db', db)
    app.set('collection', collection)
    console.log(collection)

    Mongodb.close()
    const PORT = SERVER_PORT || 5005
    app.listen(PORT, () => { console.log(`server running on port ${PORT}`) })
  }
})



app.get('/mongoDbTest', (req, res) => {
  const collection = req.app.get('collection')
  collection.insertOne({name: 'Roger'}, (err, result) => {
  })
  console.log('hit')
})



