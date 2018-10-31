const fetch = require('isomorphic-fetch')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use('/aismagellan/things', (req, res) => {
  fetch('https://www.aismagellan.io/api/things/pull/5a1e0b60-d282-11e8-be06-154c92873ad1')
  .then(res => {
    if(!res.ok) throw res.body
    return res.json()
  })
  .then(json => {
    res.json(json)
  })
  .catch(err => {
    res.json(err)
  })
})

app.listen(6000)