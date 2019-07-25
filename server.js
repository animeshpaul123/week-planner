const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`))