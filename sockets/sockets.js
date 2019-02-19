const db = require('../models');

module.exports = function (io) {

    io.on('connection', function (socket) {
        console.log('connected');

        (data) => ({ name: data.title, html: data.html, css: data.css, javascript: data.javascript })

		socket.on('create-project', function (data) {
            db.Project.create({ _id: data._id }, { $set: data })
            .catch(err => { console.log(err) })
            io.emit('create-project', {
                message: data
            });
        })
        
        socket.on('codechange', (data) => {
            db.Project.findByIdAndUpdate({ _id: data._id }, { $set: data })
                .catch(err => { console.log(err) })
            io.emit('codechange', {
                message: data
            });
        });

        socket.on('update-title', function (data) {
            console.log("Socket TITLE")
            io.emit('update-title', data);
        })

        socket.on('update-html', function (data) {
            console.log("Socket HTML")
            io.emit('update-html', data);
        })

        socket.on('update-css', function () {
            console.log("Socket CSS")
            io.emit('update-css');
        })

        socket.on('update-js', function (data) {
            console.log("Socket JS")
            io.emit('update-js', data);
        })

        socket.on('delete-project', function (data) {
            io.emit('delete-project', data);
        })

    })
    
}