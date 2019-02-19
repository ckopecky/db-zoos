const router = require('express').Router();
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const get = ((req, res) => {
    console.log(req.body);
        db
        .select().from('zoos')
        .then(response => {
            console.log(response);
            if(response == null) {
                res.status(400).json("No zoos to show")
            }
            else {
                res.status(200).json(response);
            }
        })
        .catch(err => {
        res.status(500).json(err);
        })
    });

    const getID = ((req, res) => {
        console.log(req.params);
        const { id } = req.params;

        db.select().from('zoos')
        .where({id : id})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json(err);
        })
    });

    const post = ((req, res) => {
        db('zoos').insert()
            .then(ids => {
                console.log(ids, "ids");
                res.status(201).json(ids);
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).json(err);
            })
        });

        const put = ((req, res) => {
            const changes = req.body;
            const { id } = req.params;

            db('zoos')
                .where({id: id})
                .update(changes)
                .then(count => {
                    //count === number of records updated
                res.status(200).json(count);
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        });

    const del = ((req, res) => {
        const { id } = req.params;

        db  
            .select().from('zoos')
            .where({ id : id})
            .del()
            .then(count => {
                res.status(200).json(count);
        })
            .catch(err => {
                res.status(500).json(err);
            });
        })
  
    router.route('/')
        get(get)
        post(post);
    router.route('/:id')
        get(getID)
        put(put)
        delete(del);

module.exports = 
    router
