var mongoose=require('mongoose');
const Schema=mongoose.Schema;

const HostelSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:[{filename:{type:String},filepath:{type:String}}],
    decs:{
        type:String,
        required:true
    },
    rating:{
        type:Number, 
        min:0,
        max:10,
        required:true
    },
    rooms:{
        type:[String],
    },
    features:{
        type:String, 
        required:true
    },
    price:{ 
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('Hotel',HostelSchema);