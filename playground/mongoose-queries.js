const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userId = '59148432789aa82674d6df0822';

User.findById(userId).then((user) => {
    if(!user){
        return console.log('User not found');
    }
    console.log('User: ', user);
}).catch((e) => {
    console.log('Error: ', e)
});

// var id = '5915a7f8c862d4192c3b896d22';
//
// if (!ObjectId.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => {
//     console.log(e)
// });

// User.findById
// //if no user/
// if user print
// als error print error
