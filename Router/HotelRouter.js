const express = require('express');
const router = express.Router();
const multer = require('multer');
const HotelModel = require('../Model/HotelModel');
const RoomModel = require('../Model/RoomModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});



const upload = multer({ storage: storage });

// Update the route to handle multiple files 
router.post('/upload', upload.array('images', 6), async (req, res) => {
  const fileArray = req.files;
  if (!fileArray) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const uploadedImages = [];

  for (const file of fileArray) {
    uploadedImages.push({ filename: file.originalname, filepath: `http://localhost:5500/uploads/${file.originalname}` });
  }
    const hotel =new  HotelModel({
      name: req.body.name,
      type: req.body.type,
      city: req.body.city,
      address: req.body.address,
      distance: req.body.distance,
      photos: uploadedImages,
      decs: req.body.decs,
      rating: req.body.rating,
      features: req.body.features,
      price: req.body.price
    })
    
  const  saveHotel=await hotel.save()
  res.json({status:"200",Msg:"Hotel Detail Upload Sucessfully Then you will room details",saveHotel});
});


// Update

router.put('/updateHotel/:id', async (req, res) => {
  try {
    const upadteHotel = await HotelModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(upadteHotel)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// Delete

router.delete('/deleteHotel', async (req, res) => {
  try {
    await HotelModel.deleteOne(req.query);
    res.status(200).json({
      status: "sucess",
      Message: "the Hotal has been Deleted Sucessfully"
    })
  }
  catch (err) {
    res.status(500).json(err)
  }
})   

// Get  

router.get('/getHotel/:id', async (req, res) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    res.json(hotel)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// GetAll
router.get('/getHotels', async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await HotelModel.find({
      ...others,
      price: { $gt: min | 0, $lt: max || 999 }
    });
    res.json(hotels)
  }
  catch (err) {
    res.status(500).json(err)
  }
})
router.get('/getAllhotels', async (req, res) => {
  HotelModel.find(req.query)
 
  .then(data => res.json(data))
  .catch(error => res.json(error))
})

router.get('/room/:id', async (req, res) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;