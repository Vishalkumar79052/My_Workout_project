const express = require('express');
const dotenv = require('dotenv');
const workout = require('./routes/workout')
const mongoose = require('mongoose')


dotenv.config();


const app = express();

app.use(express.json())

app.use((req , res , next) =>{
   console.log(req.path, req.method)
   next();
})

app.get('/',(req , res) => {
    res.json("HII,VISHAL KUMAR");
})

app.use('/api/workouts/',workout);

mongoose.connect(process.env.MONGO_URL).then(() =>{
    app.listen(PORT,() =>{
        console.log(`server is up and listning at: http://localhost:${PORT}
             & connected to our db`)
    })

}).catch((error) =>{
     console.log(error)
})

const PORT = process.env.PORT;

