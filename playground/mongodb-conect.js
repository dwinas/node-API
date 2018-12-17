const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

if(err) {
    return console.log('Unable to conect to mongo db')
}
console.log('connected to db')
const db = client.db('TodoApp')

// db.collection('Todos').insertOne({
//     text: 'Jonas',
//     completed: true
// }, (err, result) =>{

//     if(err){

//         return console.log('Unable to create object')
//     }

//     console.log(JSON.stringify(result.ops,undefined, 2))
// })

db.collection('Users').insertOne({

    name: 'Juozas',
    surname: 'Petras'  

}, (err, result) =>{

    if (err) {
        return console.log('Unable to save object')
    }

    console.log(JSON.stringify(result.ops, undefined, 2))
})




client.close()
})