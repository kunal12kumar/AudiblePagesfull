import express from 'express';
const server=express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes/ruserdata.js';
import router1 from './routes/rpdf.js'

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mrkunalkr:Santosh1k@cluster0.klpyz.mongodb.net/AudiblePages?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Could not connect to MongoDB Atlas...', err));

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


server.use('/api/ruserdata',router);
server.use('/api/rpdf',router1);




server.listen(8091,()=>{
    console.log("Server created successfully");
})
