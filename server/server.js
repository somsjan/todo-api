require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            if (todo){
                return res.send({todo});
            } else {
                return res.status(404).send();
            }
        }, (e) => {
            console.log('error');
            return res.status(400).send();
        });
    }
    // res.send(req.params);
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)){
        return res.status(404).send();
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (todo){
                return res.status(200).send({todo});
            } else {
                return res.status(404).send();
            }
        }).catch((e) => {
            return res.status(400).send();
        });
    }
});

app.patch('/todos/:id', (req, res) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo){
            return res.status(400).send();
        }
        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });

});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});


app.get('/users/me', authenticate,(req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    //var body = _.pick(req.body, ['email', 'password']);
    var email = (req.body.email).toLowerCase();
    var password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(port, () => {
    console.log(`Starting up at port: ${port}`);
});


module.exports = {app};
