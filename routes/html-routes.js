const path = require('path');
var express = require('express');

module.exports = function (app) {

    app.get('/edit', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/edit.html'));
    })

    app.get('/edit/:id', function (req, res) {
        res.sendFile(path.join(__dirname, '/../public/edit.html'));
    })

    //Default to index.html
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/edit.html'));
    });

}