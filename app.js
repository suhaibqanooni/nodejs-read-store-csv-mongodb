const express = require('express')
const mongoose = require("mongoose");
const app = express()
const port = 4000
const fileUpload = require("express-fileupload");
const router = require('./Routes/UserRoutes');

app.use(fileUpload())
app.use(router)

app.get('/', (req, res) => {
    res.send(`Server is Litening on Port ${port}`)
})

app.listen(port, () => {
    mongoose.connect("mongodb://127.0.0.1:27017/evaluation", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`App listening on port ${port}`)
})