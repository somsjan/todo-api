// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to server: ');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Users').deleteMany({name: 'Jan'}).then((result) => {
    //     console.log(result.result);
    // });

    // deleteOne
    // db.collection('Users').deleteOne({
    //         _id : ObjectId('5913112816a492191c673166')
    //     }).then((result) => {
    //     console.log(result.result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
            _id : new ObjectId("5913112816a492191c673166")
        }).then((result) => {
        console.log(result);
    });

    //db.close();
});
