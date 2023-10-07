const express = require('express');
const tasks = require('./routes/tasks.js');
const app = express();
const connectDB = require('./db/connect.js');
require('dotenv').config();
const URL = process.env.MONGO_URI;


//middleware
app.use(express.static('./public'))
app.use(express.json());
app.use('/api/v1/tasks',tasks);

const port = process.env.PORT || 5000;

const start = async() =>{
    try{
        await connectDB(URL)
        app.listen(port,()=>{
            console.log('Server is listening on port 5000..');
        });
    }
    catch(err){
        console.log(err);
    }
}
start();



