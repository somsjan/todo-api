const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
if(process.env.PORT){
    process.env.MONGODB_URI = 'mongodb://admin:123@ds141401.mlab.com:41401/todo-api';
}

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

app.listen(port, () => {
    console.log(`Starting up at port: ${port}`);
});


module.exports = {app};
