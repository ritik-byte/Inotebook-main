const mongoose = require('mongoose');
const MongooseURI = "mongodb://localhost:27017/inotebook";



const connectToMongo = ()=>{

    mongoose.connect(MongooseURI).then(
        () => { console.log("Connected to mongod databses") },
        err => { /** handle initial connection error */ }
      );
}
console.log("Suceess");
module.exports = connectToMongo;