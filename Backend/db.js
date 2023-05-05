// only for connected database mongo db to create this files

const mongoose = require ('mongoose');
const MONGO_URL =  "mongodb://127.0.0.1:27017/inotebook"


const connectToMongo = () => {
    mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log('connected Mongo database')
    })
    .catch((err) => {
        console.log (err, "Have Eror to connection of database")
    })
}

module.exports = connectToMongo