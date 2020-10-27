const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { registerValidation } = require('../helpers/Validation');
const { passwordValidation } = require('../helpers/Validation')
const { loginValidation } = require('../helpers/Validation');
const { verifyConnection }   = require('../helpers/verifyAuth');

// Register route that create a user in DB
router.post('/register', async (req, res) => {
    // We first validate the user informations 
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).json({ errorMessage: error.details[0].message })

    // We check if passwords are the same
    const passwordCheck = passwordValidation(req.body.password, req.body.repeatedPassword);
    if(!passwordCheck) return res.status(400).json({ errorMessage: "Passwords are not the same." })

    // We check if the user is or isn't in DB
    const emailIsTaken = await User.findOne({ email: req.body.email });
    if(emailIsTaken) return res.status(400).json({ errorMessage: 'Email is already taken.' })

    // We hash the password 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // We create the user then save him in DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save();
        req.session.userId = savedUser._id
        res.json({ user: savedUser._id, message: `Connected as ${savedUser.name}`})
    } catch (error) {
        res.status(400).json({ errorMessage: error })
    }   
});

// Login route that connect the user 
router.post('/login', verifyConnection, async (req, res) => {
    // We first validate the user informations 
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).json({ errorMessage: error.details[0].message });

    // We check if the user is or isn't in DB
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({ errorMessage: 'Email doesnt exist' });

    // We check if the password is correct
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.status(404).json({ errorMessage: 'Invalid password' }); 

    // We create a session using req.session
    req.session.userId = user._id;
    
    // Create and assign a jwt
   /* const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    console.log(req.session);
    res.header('auth-token', token).send(`Welcome back ${token}`);*/
    //res.send(`Welcome back ${user.name}`)
    res.json({ user: req.session.userId })  
});

router.get("/me", async (req, res) => {
    if (typeof(req.session.userId) === "undefined") {
      res.status(401).json( { errorMesage: "You are not connected, please connect or register" } )
      return
    }
      const user = await User.findOne({ _id: req.session.userId})
      res.json( { userId: user._id, userName: user.name } )
  });


module.exports = router;