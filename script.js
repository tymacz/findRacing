//import des fonctions utiles au bon fonctionnement
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
  //différentes routes permettant de communiquer avec la base
    app.get('/niveaux',db.getLevel)
    app.get('/pays',db.getPays)
    app.get('/circuit',db.getCircuit)
    app.get('/cars',db.getCars)
    app.get('/controleur',db.getControleur)
    app.post('/joueur',db.createUser)
    app.get('/filter/:paramsString',db.getUsersFilter)
    app.get('/search/:id&:search',db.getUsersSearch)
    app.get('/otherUser/:id',db.getUsers)
    app.get('/joueur/',db.getAllUsers)
    app.get('/connection/:usr&:password',db.connection)
    app.get('/delete/:id',db.deleteUser)

