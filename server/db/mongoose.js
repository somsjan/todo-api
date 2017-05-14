const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds141401.mlab.com:41401/todo-api' ||
                'mongodb://localhost:27017/ToDoApp');

module.exports = {
    mongoose
};
