let express= require('express');
let router=express.Router();
const RoomModel = require('../Model/RoomModel');
const HostelModel=require('../Model/HotelModel');


// create
router.post('/addRoom/:hotelId', async (req,res)=>{
    const hotelId=req.params.hotelId;
    const newRoom= new RoomModel(req.body)
    try{
       const  saveRoom=await newRoom.save()
      try{
        await HostelModel.findByIdAndUpdate(hotelId,{$push:{rooms:saveRoom._id}})
      }
      catch(err){
        res.json(err)
      }
      res.json({status:"sucess",saveRoom})
    }
    catch(err){
        res.status(500).json(err)
    }
})
// Update

router.put('/updateRoom/:id',async(req,res)=>{
  try{
     const  upadteRoom=await RoomModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
     res.status(200).json(upadteRoom)
  }
  catch(err){
      res.status(500).json(err)
  }
})

router.put('/availability/:id',async(req,res)=>{
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    res.json(err);
  }
})
// Delete

router.delete('/:id/:hotelId',async(req,res)=>{
  const hotelId=req.params.hotelId;
  try{
    await  RoomModel.findByIdAndDelete(req.params.id);
    try{
      await HostelModel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
    }
    catch(err){
      res.json(err)
    }
    res.status(200).json({
      "status":"sucess",
      "code":200,
      "Message":"the Room has been Deleted Sucessfully"
     })
  } 
  catch(err){
      res.status(500).json(err)
  }
})
router.put('/avability/:id',async(req,res)=>{
  try {
    await RoomModel.updateOne(
      { "roomNumber._id": req.params.id },
      {
        $push: {
          "roomNumber.$.unavalibledate": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
})
// Get 
router.get('/getRoom/:id',async (req,res)=>{
  try{
     const room= await  RoomModel.findById(req.params.id);
       res.json(room)
    }
    catch(err){
        res.status(500).json(err)
    }
})
// GetAll
router.get('/getAllRoom',async (req,res)=>{
  try{
     const Room= await  RoomModel.find();
       res.json(Room)
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports=router;