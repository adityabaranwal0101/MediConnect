import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import {Server} from 'socket.io'
import http from 'http';

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Use __dirname to serve static files
// app.use(express.static(path.join(__dirname, 'public')));


// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
// CORS Policy
app.use(cors({
  origin: '*', // Allow requests from all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
}));
// app.use(cors())

// Database Connection
connectDB(DATABASE_URL)

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(path.join(__dirname, 'public')));
// console.log(__dirname);

// JSON
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load Routes
app.use("/", userRoutes)

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`)
// })

const server = http.createServer(app);
let io = new Server(server);
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
io.on("connection",function(socket){
  
    socket.on("join",function(roomName){
        var rooms=io.sockets.adapter.rooms;

        var room=rooms.get(roomName);
        

        if(room==undefined){
            socket.join(roomName);
            socket.emit("created");
        }
        else if(room.size==1){
            socket.join(roomName);
            socket.emit("joined");
        }
        else{
           socket.emit("full");
        }
    });

    socket.on("ready",function(roomName){
        console.log(roomName +"*");
        socket.broadcast.to(roomName).emit("ready");
    })

    socket.on("candidate",function(candidate,roomName){
        //console.log("candidate");
        // console.log(candidate);
        socket.broadcast.to(roomName).emit("candidate",candidate);
    })

    socket.on("offer",function(offer,roomName){
        console.log("offer");
        // console.log(offer);
        socket.broadcast.to(roomName).emit("offer",offer);
    })
    socket.on("answer",function(answer,roomName){
        console.log("answer");
        socket.broadcast.to(roomName).emit("answer",answer);
    });


    //leave room
    socket.on("leave",function(roomName){
        socket.leave(roomName);
        socket.broadcast.to(roomName).emit("leave");
    })
});