const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { registerValidation } = require('../Validation');
const { passwordValidation } = require('../Validation')
const { loginValidation } = require('../Validation');
const { verifyConnection }   = require('./verifyAuth');


// Register route that create a user in DB
router.post('/register', async (req, res) => {
    // We first validate the user informations 
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // We check if passwords are the same
    const passwordCheck = passwordValidation(req.body.password, req.body.repeatedPassword);
    if(!passwordCheck) return res.status(400).send("Passwords are not the same.")

    // We check if the user is or isn't in DB
    const emailIsTaken = await User.findOne({ email: req.body.email });
    if(emailIsTaken) return res.status(400).send('Email is already taken.')

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
        res.send({ user: savedUser._id, message: `Connected as ${savedUser.name}`})
    } catch (error) {
        res.status(400).send(error)
    }   
});

// Login route that connect the user 
router.post('/login', verifyConnection, async (req, res) => {
    // We first validate the user informations 
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[O].message);

    // We check if the user is or isn't in DB
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email doesnt exist');

    // We check if the password is correct
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.status(404).send('Invalid password'); 

    // We create a session using req.session
    req.session.userId = user._id;
    
    // Create and assign a jwt
   /* const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    console.log(req.session);
    res.header('auth-token', token).send(`Welcome back ${token}`);*/
    res.send(`Welcome back ${user.name}`)
    
});


module.exports = router;