const express = require('express');
const User = require('../models/User.js')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser.js');

const jwt_secret = "GoodByeBYSEEyouagain";


// Create User 
router.post('/', [
   body('name', "Mininum length is 3 for name").isLength({ min: 3 }),
   body('email', "Enter a valid Email").isEmail(),
   body('password', "Enter a valid Password").isLength({ min: 5 })
], async (req, res) => {
   let success = false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
   }
   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ success,error: "This email is already registered" })
      }
      const salt = await bcrypt.genSalt(10);
      secpass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secpass
      });


      //for Creating the user purpose
      const data = {
         user: {
            id: user.id
         }
      }
      // sign generates the token which can be given as seesion tooken and json webtoken
      const AuthToken = jwt.sign(data, jwt_secret);
      success=true;
      res.json({success, AuthToken });

      // res.json(user);// send the response of the user
   }//catch the error 
   catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured")

   }
   // .then(user =>res.json(user))
   // .catch(err =>{console.log(err)
   // res.json({error :'The email is already registered'})})
   // res.send(req.body);
})

// Login to the Server
router.post('/login', [
   body('email', "Enter valid email").isEmail(),
   body('password', "Password cannot be blank").exists()
], async (req, res) => {
   let success=false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({success, error: "Please , login with correct Credentials " })
      }

      const Comparepassword = bcrypt.compareSync(password, user.password);
      if (!Comparepassword) {

         return res.status(400).json({ success,error: "Please , login with correct Credentials password " })
      }

      //for login and verifying purpose
      const data = {
         user: {
            id: user.id
         }
      }
      // sign generates the token which can be given as seesion tooken and json webtoken
      success=true;
      const AuthToken = jwt.sign(data, jwt_secret);
      res.json({success, AuthToken });

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Ocuured")

   }
})


// Route 3 : Get login details using POST: /getuser . LOGIN REQUIred
router.post('/getuser', fetchuser, async (req, res) => {
   try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Ocuured")

   }
})












module.exports = router