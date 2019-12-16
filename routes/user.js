const express = require('express');
const router = express.Router();
const uuidAPIKey = require('uuid-apikey');
const db = require('../models');

const checkAPIKey = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const apiKey = bearer[1];
        const authUser = await db.User.findOne({
            where: {api_key: apiKey}
        }, {
            raw: true
        });
        if(!authUser) { //Invalid API KEY
            return res.status(403).json({success: false, error: 'Invalid API key!'});
        }
        req.user = authUser;
        next();
    } else {
        // Forbidden
        res.status(403).json({ success: false, error: 'API key is required.'});
    }
}

router.get('/next', checkAPIKey, async (req, res, next) => { 
    const user = await db.User.findByPk(req.user.id, { raw: true });
    const next_integer = user.current_integer + 1;
    await db.User.update({
        current_integer: next_integer
    },{
        where: {
            id: user.id
        }
    });
    res.status(200).json({success: true, next: next_integer});
});

router.get('/current', checkAPIKey, async (req, res, next) => { 
    const user = await db.User.findByPk(req.user.id, { raw: true });

    res.status(200).json({success: true, current: user.current_integer});
});

router.put('/current', checkAPIKey, async (req, res, next) => {
    const current = req.body.current; 
    const user = await db.User.findByPk(req.user.id, { raw: true });
    await db.User.update({
        current_integer: current
    },{
        where: {
            id: user.id
        }
    });
    res.status(200).json({success: true, current});
});

router.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const user = await db.User.findOne({where: {email: email}}, { raw: true });
    if(user) {
        res.json({success: false, error: 'Email already taken!'});
        return;
    }
    const api_key = await uuidAPIKey.create();

    try {
        const newUser = await db.User.create({
            email,
            password,
            name,
            api_key: api_key.apiKey,
            raw: true
        });

        res.json({success: true, api_key: newUser.api_key})
    } catch(err) {
        res.json({success: false, error: err});
    }

});
module.exports = router;