const express = require('express');
const router = express.Router();
const uuidAPIKey = require('uuid-apikey');
const db = require('../models');
const bcrypt = require('bcryptjs');

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
            return res.status(403).json({success: false, errors: 'Invalid API key!'});
        }
        req.user = authUser;
        next();
    } else {
        // Forbidden
        res.status(403).json({ success: false, errors: 'API key is required.'});
    }
}

router.get('/next', checkAPIKey, async (req, res, next) => { 
    try{
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
    } catch(err) {
        res.status(500).json({success: false, errors: ['Something went wrong']});
    }
});

router.get('/current', checkAPIKey, async (req, res, next) => { 
    try{
        const user = await db.User.findByPk(req.user.id, { raw: true });

        res.status(200).json({success: true, current: user.current_integer});
    } catch(err) {
        res.status(500).json({success: false, errors: ['Something went wrong']});
    }
});

router.put('/current', checkAPIKey, async (req, res, next) => {
    try{
        const current = req.body.current; 
        console.log('Current called', req.user.id);
        const user = await db.User.findByPk(req.user.id, { raw: true });
        await db.User.update({
            current_integer: current
        },{
            where: {
                id: user.id
            }
        });
        res.status(200).json({success: true, current});
    } catch(err) {
        res.status(500).json({success: false, errors: ['Something went wrong']});
    }
});

router.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    let errors = [];
    if(name === '')
        errors.push('Name is required');
    if(email === '')
        errors.push('E-mail is required');
    if(password === '')
        errors.push('Password is required');
    if(password !== '' && password.length < 6) 
        errors.push('Password must be at least 6 characters long!');    

    if(errors.length > 0) {
        return res.status(400).json({success: false, errors: errors});
    }

    const user = await db.User.findOne({where: {email: email}}, { raw: true });
    if(user) {
        res.status(400).json({success: false, errors: ['Email already taken!']});
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
        res.json({success: false, errors: [err]});
    }

});

router.post('/login', async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        let errors = [];
        if(email === '')
            errors.push('E-mail is required');
        if(password === '')
            errors.push('Password is required');

        if(errors.length > 0) {
            return res.status(400).json({success: false, errors: errors});
        }

        const user = await db.User.findOne({ where: { email }});
        if(!user) {
            return res.status(400).json({ success: false, errors: ['Invalid credentials!']});
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(!isMatch) {
                return res.status(400).json({ success: false, errors: ['Invalid credentials!']});
            }

            res.status(200).json({ success: true, api_key: user.api_key});
        });
    } catch(err) {
        res.status(500).json({success: false, errors: ['Something went wrong']});
    }

})
module.exports = router;