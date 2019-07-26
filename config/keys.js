module.exports = {
    mongoURI: 'mongodb+srv://paulanimesh:animesh123@cluster0-dxkxw.mongodb.net/test?retryWrites=true&w=majority'
}

// const MongoClient = require(‘mongodb’).MongoClient;
// const uri = "mongodb+srv://paulanimesh:<password>@cluster0-dxkxw.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });