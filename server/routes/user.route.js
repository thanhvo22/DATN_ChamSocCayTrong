const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.status(201).json({
            success : true,
            data : user
        });
    } catch (error) {
        res.status(400).json({success: false});
        console.log(error);
    }
    
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    const user = await User.findOne({_id: id});
    res.json({
        success : true,
        data : user
    });
});

router.post('/create',async function(req, res) {
    let user = await User.create(req.body);
    res.json(user);  
});

router.put('/edit/:id', async (req, res) => {
    try {
        let updateUser = await User.findById(req.params.id).exec();
        updateCustomer.set(req.body);
        let result = await updateUser.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/edit2/:id', async (req, res) => {
    let doc = await Customer.findOneAndUpdate({ _id: req.params.id }, {doc: req.body },{ new: true }).exec();
    res.json(doc);
});

router.delete('/delete/:id',async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        res.status(201).json({
            success : true,
            data : user
        });
    } catch (error) {
        res.status(400).json({success: false});
        console.log(error);
    }
    
});


module.exports=router;