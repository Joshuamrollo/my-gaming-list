const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//user model
const User = require('../../models/User');

router.get('/getUser', (req, res) => {
    User.find(req)
        .then(user => res.json(user))
});

//
router.post('/reg', (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'})
    }

    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists'})

            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err

                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        });
                })
            })
        })
});

router.post('/game', (req, res) => {
    const { list, id } = req.body;

    var myquery = { _id: id };
    var newvalues = { list: list };
    User.findOneAndUpdate(myquery, newvalues, function(err, res) {
        if (err) console.log('error with list add/remove');
        //return res.send('Succesfully saved.');
    });
    
});

router.post('/rate', (req, res) => {
    const { list, id } = req.body;

    var myquery = { _id: id };
    var newvalues = { list: list };
    User.findOneAndUpdate(myquery, newvalues, function(err, res) {
        if (err) console.log('error with list add/remove');
        //return res.send('Succesfully saved.');
    });
    
});

module.exports = router;