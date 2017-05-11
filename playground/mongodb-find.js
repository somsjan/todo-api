// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to server: ');
    }
    console.log('Connected to MongoDB server');

    //db.getCollection('Todos').find({})
    // db.collection('Todos').find({
    //         _id: new ObjectID('59132d894fe3ec585211b49e')
    //     }).toArray().then((docs) => {
    //         console.log('todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err);
    //     });

    // db.collection('Todos').find().count().then((count) => {
    //         console.log(`todos count: ${count}`);
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err);
    //     });

    db.collection('Users').find({age: 27}).toArray().then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
        });

    //db.close();
});
