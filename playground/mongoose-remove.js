const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });
//
Todo.findOneAndRemove({text: 'Something to do from postman'}).then((res) => {
    console.log(res);
});

Todo.findByIdAndRemove('591983ab75f1481348248b55').then((todo) => {
    console.log(todo);
});
