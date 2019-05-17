module.exports = {
  getBots: async (req, res, next) => {
    try {
      const db = req.app.get('db')
      let botArr =  await db.get_bots()
      res.status(200).send(botArr)
    } catch (err) {
      console.log(err)
    }
  } ,
  createBot: async (req, res, next) => {
    let {name, hp, atk, def, speed, special, ulti} = req.body
    let img = `https://robohash.org/${name}`
    try{
      const db = req.app.get('db')
      await db.create_bot({name, hp, atk, def, speed, special, img, ulti})
      res.sendStatus(200)
    } catch(err){
      console.log(err)
    }
  },
  deleteBot: async (req, res, next) => {
    console.log(req.body)
    let {name} = req.body
    try{
      const db = req.app.get('db')
      await db.delete_bot({name})
      let resp = await db.get_bots()
      res.status(200).send(resp)
    }catch(err){
      console.log(err)
    }
  },
  // Mongo: (req, res, next) => {
  //   const db = req.app.get('db')
  //   console.log(db.s)
  //   const collection = db.collection('documents')
  //   collection.find({}).toArray((err, docs) => {
  //   assert.equal(err, null)
  //   console.log('got them')
  //   console.log(docs)
  //   })
  // }

}