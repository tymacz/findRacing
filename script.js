const express = require('express')
const db = require('./sql')
const app = express()
const port = 8000
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())

app.get('/',(request,response)=>{
    response.json({info:'Node.js, Express, and Postgres API'})
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
    app.get('/niveaux',db.getLevel)
    app.get('/pays',db.getPays)
    app.get('/circuit',db.getCircuit)
    app.get('/cars',db.getCars)
    app.get('/controleur',db.getControleur)
    app.post('/joueur',db.createUser)
    app.get('/joueur/:id&:search',db.getUsersSearch)
    app.get('/joueur/:id',db.getUsers)
    app.get('/joueur',db.getAllUsers)

