const db = require('../models');
const mongoose = require('mongoose')
module.exports = function (app) {

    // READ all Projects
    app.get('/api/project', function (req, res) {
        db.Project.find({})
            .then(function (dbProject) {
                res.json(dbProject);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

     // Get Selected Project
     app.get('/api/project/:Id', function (req, res) {
         console.log("get by id")
        console.log(req.body);
        db.Project.findOne({_id: req.params.Id})
            .then(function (dbProject) {
                res.json(dbProject);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // CREATE Project
    app.post('/api/project', function (req, res) {
        console.log(req.body);
        db.Project.create(req.body)
            .then(function (dbProject) {
                res.json(dbProject);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // UPDATE Project
    app.put('/api/project/:Id', function (req, res) {
        db.Project.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.Id)}, req.body)
            .then(function (dbProject) {
                res.json(dbProject);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

      // DELETE Project
    app.delete('/api/project/:Id', function (req, res) {
        db.Project.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.Id) }, req.body)
            .then(function (dbProject) {
                res.json(dbProject);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

};
