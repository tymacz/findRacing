const { request } = require('express');
const { Pool } = require('pg');
const pool =
    new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'Matching_SIMRACING',
        tables: 'localisation',
        password: 'M361r2b2?',
        port: '5432',
        max: 20, // Maximum number of clients in the pool 
        idleTimeoutMillis: 30000,
    })

    const getLevel = (request,response)=>{
        pool.query('SELECT id_niveau,rang FROM niveau ORDER BY rang ASC',(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
    const getAllUsers = (request,response)=>{
        pool.query('SELECT id_joueur,nom_utilisateur FROM joueur ORDER BY id_joueur ASC',(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
    const getUsers = (request,response)=>{
        const id = request.params.id
        console.log(id)
        const sql  = `SELECT nom_utilisateur,localisation.pays,niveau.rang,circuit.nom_circuit,vehicule.nom_vehicule,controleur.reference_controleur,systeme_communication FROM joueur INNER JOIN localisation ON joueur.id_localisation = localisation.id_localisation INNER JOIN niveau ON joueur.id_niveau = niveau.id_niveau INNER JOIN circuit ON joueur.id_circuit = circuit.id_circuit INNER JOIN controleur ON joueur.id_controleur = controleur.id_controleur INNER JOIN vehicule ON joueur.id_vehicule = vehicule.id_vehicule WHERE id_joueur <> ${id} ORDER BY nom_utilisateur ASC `
        pool.query(sql,(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
    const getUsersSearch = (req,res)=>{
        const id = req.params.id
        const search = req.params.search
        searchPattern = "%"+search+"%"
        const stock = [id,searchPattern]
        console.log(stock)
        const sql =`SELECT nom_utilisateur,localisation.pays,niveau.rang,circuit.nom_circuit,vehicule.nom_vehicule,controleur.reference_controleur,systeme_communication FROM joueur INNER JOIN localisation ON joueur.id_localisation = localisation.id_localisation INNER JOIN niveau ON joueur.id_niveau = niveau.id_niveau INNER JOIN circuit ON joueur.id_circuit = circuit.id_circuit INNER JOIN controleur ON joueur.id_controleur = controleur.id_controleur INNER JOIN vehicule ON joueur.id_vehicule = vehicule.id_vehicule WHERE id_joueur <> $1 and pays LIKE $2 or nom_utilisateur LIKE $2 or niveau.rang LIKE $2 or circuit.nom_circuit LIKE $2 or vehicule.nom_vehicule LIKE $2 or controleur.reference_controleur LIKE $2 ORDER BY nom_utilisateur ASC `
        pool.query(sql,stock,(error,results)=>{
            if(error){
                throw error
            }
            res.status(200).json(results.rows)
        })
    }
    const getPays = (request,response)=>{
        pool.query('SELECT id_localisation, pays FROM localisation ORDER BY pays ASC',(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

    const getCircuit = (request,response)=>{
        pool.query('SELECT id_circuit,nom_circuit FROM circuit WHERE id_circuit<184 ORDER BY nom_circuit ASC',(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

    const getCars = (request,response)=>{
        pool.query('SELECT id_vehicule ,nom_vehicule FROM vehicule ORDER BY nom_vehicule ASC',(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

    const getControleur = (request,response)=>{
        pool.query('SELECT id_controleur ,reference_controleur FROM controleur ORDER BY reference_controleur ASC',(error,results)=>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

     const createUser = async (req, res) => {
        //const usr = [req.body.username,req.body.birthday,req.body.systeme_communication,req.body.id_niveau,req.body.id_localisation,req.body.id_controleur,req.body.id_circuit,req.body.id_vehicule]
        const user = [req.body.usrname,req.body.birth,req.body.com,req.body.list_rank,req.body.localisation,req.body.list_controleur,req.body.list_circuit,req.body.list_cars]
        const sql = 'INSERT INTO joueur VALUES ((SELECT MAX (id_joueur) FROM joueur)+1, $1 , $2 , $3 , $4 , $5 , $6 , $7 , $8) RETURNING id_joueur'
        try {
            const result = await pool.query(sql, user);
            const idUser = result.rows[0].id_joueur;
            console.log(idUser);
            res.status(201).json(idUser);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'inscription');
        }
    };

    module.exports = {
        getLevel,
        createUser,
        getPays,
        getCircuit,
        getCars,
        getControleur,
        getUsers,
        getAllUsers,
        getUsersSearch
    }
