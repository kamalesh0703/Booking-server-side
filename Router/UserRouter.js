let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');

const UserModel = require('../Model/UserModel');

// create

router.post('/register', async (req, res) => {
    try {
        const { username, email,password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hashedpassword) => {
                const password = hashedpassword;
                const newuser = new UserModel({ username, email, password })
                newuser.save()
                .then(()=>res.json({ "Status": "200", "Msg":"user login Scuessfully" }))
                .catch((err)=> res.json({"Status":"Error!"+err}))
            })
        }) 
    }
    catch (err) {
        res.json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            const passwordvalidate = await bcrypt.compare(req.body.password, user.password)
            if (passwordvalidate) {
                res.json({Msg:"Login Sucessfully",user})
            } 
            else{
                res.json({"Status": "401", "Msg":"Password  Incorrect" }) 
            }
        }
        else {
            res.json({ "Status": "402", "Msg": "user not found" }) 
        }
    }
    catch (error) {
        res.json(error)
    }
})
router.post('/admin', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            if(user.isAdmin){
                const passwordvalidate = await bcrypt.compare(req.body.password, user.password)
               if(passwordvalidate){
                 return res.json({ message: 'Login successful',status:"200", user });
               }
               else{
                return res.json({message:'Password Incorrect',status:"202",user})
               }
            }
            else{
                return res.json({ message: 'you not admin',status:"402", user });
            }
        } else { 
            return res.status(401).json({ message: 'You are not Admin' });
        }
    }  
    catch (error) {
        res.json(error)
    }
})
module.exports = router;