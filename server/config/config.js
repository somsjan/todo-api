var env = process.env.NODE_ENV || 'development';

if (env === 'development'){
    process.env.PORT = 3000;
    if (process.env.PORT == 3000) {
        process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp';
        console.log('Using local DB');
    } else {
        process.env.MONGODB_URI = 'mongodb://admin:123@ds141401.mlab.com:41401/todo-api';
        console.log('Using mLab DB');
    }

} else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest';
    console.log('Using local TEST db');
}
