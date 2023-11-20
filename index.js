const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const dbConfig=require('./DataBase/Database');
const HotelRouter=require('./Router/HotelRouter');
const UserRouter=require('./Router/UserRouter');
const RoomRouter=require('./Router/RoomRouter');

mongoose.connect(dbConfig.db)
.then(()=>{
    console.log("DataBase Succesfully connected!")
}, 
error =>{
    console.log("Could not connect to Database:"+error)
}) 

let app=express();
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/Hotel',HotelRouter)
app.use('/User',UserRouter) 
app.use('/rooms',RoomRouter) 
app.listen(5500,()=>{
    console.log("Start server Side Port Number-5500")
})