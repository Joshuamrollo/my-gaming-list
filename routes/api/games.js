const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Game = require('../../models/Game');

router.get('/get', (req, res) => {
    Game.find()
        .then(games => res.json(games))
});

router.post('/newGame', auth, (req, res) => {
    const newGame = new Game({
        title: req.body.title
    });

    newGame.save().then(game => res.json(game));
});

router.delete('/:id', auth, (req, res) => {
    Game.findById(req.params.id)
        .then(game => game.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));
})

router.post('/rating', (req, res) => {
    const { game, num, user } = req.body;

    game.ratings[user.id] = num;

    const newRatings = game.ratings;
    var myquery = { _id: game._id };
    var newvalues = { ratings: newRatings };
    Game.findOneAndUpdate(myquery, newvalues, function(err, res) {
        if (err) console.log('error with list add/remove');
        //return res.send('Succesfully saved.');
    });
    
});

router.post('/deleteRating', (req, res) => {
    const { game, user } = req.body;

    const newRatings = {};

    for(key in game.ratings){
        if(key !== user.id){
            newRatings[key] = game.ratings[key];
        }
    }

    var myquery = { _id: game._id };
    var newvalues = { ratings: newRatings };
    Game.findOneAndUpdate(myquery, newvalues, function(err, res) {
        if (err) console.log('error with list add/remove');
        //return res.send('Succesfully saved.');
    });
    
});

module.exports = router;