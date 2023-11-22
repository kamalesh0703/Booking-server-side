var mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RoomSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    // price:{
    //     type:Number,
    //     required:true
    // },
    maxPeople:{
        type:Number,
        required:true
    },
    decs:{ 
        type:String,
        required:true
    },
    roomNumber:[{number:Number,unavalibledate:[{type:Date}]}]
},{timestamps:true})
module.exports=mongoose.model('Rooms',RoomSchema);