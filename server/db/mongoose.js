const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds141401.mlab.com:41401/todo-api' ||
//                 'mongodb://localhost:27017/ToDoApp');
//

// var localDB = 'mongodb://localhost:27017/ToDoApp';
// var mLab = 'mongodb://admin:123@ds141401.mlab.com:41401/todo-api';
// mongoose.connect(localDB || mLab);

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp';
mongoose.connect(url);


module.exports = {
    mongoose
};

//heroku config:set MONGODB_URI=mongodb://admin:123@ds141401.mlab.com:41401/todo-api
