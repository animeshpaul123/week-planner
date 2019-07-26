const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require('path')

const posts = require('./routes/api/posts');
const app = express()

app.use(bodyParser.json())

//db config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch(error => console.log('db error',error));

app.use('/api/posts', posts)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`))